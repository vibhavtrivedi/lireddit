
import { Field, ObjectType } from "type-graphql";
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@ObjectType()
@Entity()
export class PhotoType extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column({
        length: 100,
    })
    name: string

    @Field()
    @Column("text")
    description: string

    @Field()
    @Column()
    filename: string

 
    @Field()
    @Column()
    views: number

    @Field()
    @Column()
    isPublished: boolean
}