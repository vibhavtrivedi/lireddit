import { Query, Resolver } from "type-graphql";
import { PhotoType } from "../entities/photo.entity"

@Resolver()
export class PhotoResolver {
    @Query(() => [PhotoType]) // Specify the GraphQL output type as an array of PhotoType
    async photos(): Promise<PhotoType[]> {
        return PhotoType.find()
    }
}
