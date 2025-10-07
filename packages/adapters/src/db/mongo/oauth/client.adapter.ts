import type {
  IAuthorizationCodeAdapter,
  CreateAuthorizationCodeDTO,
  AuthorizationCode,
} from '@arc-id/data';
import type { Db, WithId, Document } from 'mongodb';
import { generateId } from '@arc-id/common';

export class MongoAuthorizationCodeAdapter implements IAuthorizationCodeAdapter {
  private collection;

  constructor(private db: Db) {
    this.collection = db.collection('authorizationCodes');
  }

  switchClient(newDb: Db) {
    this.db = newDb;
    this.collection = newDb.collection('authorizationCodes');
    return this;
  }

  private normalize(doc: WithId<Document>): AuthorizationCode {
    return {
      id: (doc.id as string) ?? doc._id.toString() ?? generateId(),
      code: doc.code,
      clientId: doc.clientId,
      identityId: doc.identityId,
      redirectUri: doc.redirectUri ?? null,
      scopes: Array.isArray(doc.scopes) ? doc.scopes : [doc.scopes ?? ''],
      createdAt: doc.createdAt ?? new Date(),
      expiresAt: doc.expiresAt,
      consumed: doc.consumed ?? false,
    };
  }

  async createCode(data: CreateAuthorizationCodeDTO): Promise<AuthorizationCode> {
    const codeDoc: Omit<AuthorizationCode, 'id'> = {
      code: data.code,
      clientId: data.clientId,
      identityId: data.identityId,
      redirectUri: data.redirectUri ?? null,
      scopes: Array.isArray(data.scopes) ? data.scopes : [data.scopes ?? ''],
      createdAt: new Date(),
      expiresAt: data.expiresAt,
      consumed: false,
    };

    const result = await this.collection.insertOne(codeDoc);
    return this.normalize({ ...codeDoc, _id: result.insertedId });
  }

  async consumeCode(code: string): Promise<AuthorizationCode | null> {
    const updated = await this.collection.findOneAndUpdate(
      { code },
      { $set: { consumed: true } },
      { returnDocument: 'after' }
    );

    if (!updated.value) return null;
    return this.normalize(updated.value);
  }

  async findByCode(code: string): Promise<AuthorizationCode | null> {
    const doc = await this.collection.findOne({ code });
    if (!doc) return null;
    return this.normalize(doc);
  }
}
