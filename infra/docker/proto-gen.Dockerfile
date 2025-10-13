FROM namely/protoc-all:1.56_2   # or the latest stable tag
WORKDIR /defs
ENTRYPOINT ["protoc"]
