import { Post } from "../entities/post.entity";
import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  async posts(): Promise<Post[]> {
    return Post.find();
  }

  @Query(() => Post, { nullable: true })
  post(@Arg("id") id: number): Promise<Post | null> {
    return Post.findOne({ where: { id: id } });return Post.findOne({ where: { id: id } });
  }

  @Mutation(() => Post)
  async createPost(@Arg("title") title: string): Promise<Post | null> {
    return Post.create({ title }).save();
  }

//   @Mutation(() => Post, { nullable: true })
//   async updatePost(
//     @Arg("id", () => Int) id: number,
//     @Arg("title", { nullable: true }) title: string
//   ): Promise<Post | null> {
//     //   const result = AppDataSource
//     //       .createQueryBuilder()
//     //       .update(Post)
//     //       .set({ title })
//     //       .where('id=:id', {
//     //           id: id
//     //       }).execute();

//     return null;
//   }

  @Mutation(() => Boolean)
  async deletePost(@Arg("id", () => Int) id: number): Promise<boolean | null> {
    await Post.delete({ id });
    return true;
  }
}
