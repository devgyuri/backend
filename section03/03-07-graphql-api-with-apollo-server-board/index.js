import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `#graphql
  input CreateBoardInput {
    writer: String!
    title: String
    contents: String
  }
  type MyResult {
    number: Int
    writer: String
    title: String
    contents: String
  }
  type Query {
    fetchBoard: [MyResult]
  }
  type Mutation {
    createBoard(createBoardInput: CreateBoardInput!): String
  }
`;

const resolvers = {
  Query: {
    fetchBoard: (parent, args, context, info) => {
      const result = [
        { number: 1, writer: "철수", title: "안녕", contents: "내용내용" },
        {
          number: 2,
          writer: "영희",
          title: "너의 이름은",
          contents: "무엇이니",
        },
        { number: 3, writer: "맹구", title: "...", contents: "잘 부탁해" },
      ];
      return result;
    },
  },
  Mutation: {
    createBoard: (_, args) => {
      console.log(args.qqq);

      return "게시물 등록에 성공하였습니다.";
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: true,
  // cors: {origin: ["https://naver.com", "https://daum.net"]}
});

startStandaloneServer(server);
