import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as sc from '../db/schema';
// import { DrizzleAsyncProvider } from 'src/core-modules/drizzle/drizzle.provider';
import * as q from 'drizzle-orm';
import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider';

@Injectable()
export class EmployeesService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private db: NodePgDatabase<typeof sc>,
  ) {}

  async findAll() {
    const employees = await this.db.select().from(sc.employee);
    return employees;
  }
}

// @Injectable()
// export class PostService {
//   constructor(
//     @Inject(DrizzleAsyncProvider)
//     private db: NodePgDatabase<typeof sc>,
//     private cloudinaryService: CloudinaryService,
//   ) {}

//  async createPost(userId: number, createPostDto: CreatePostDto) {
//     const [post] = await this.db
//       .insert(sc.posts)
//       .values({ authorId: userId, ...createPostDto })
//       .returning();
//     const [newpost] = await this.selectPostsWithAuthor(userId).where(
//       q.eq(sc.posts.id, post.id),
//     );
//     return newpost;
//   }
