'use server';

import Post from "@/lib/schema/post.model";
import { connectToDB } from "../db";
import User from "@/lib/schema/user.model";
import Tag from "@/lib/schema/tag.model";


const SearchableTypes = ["post", "user", "tag"];

export async function globalSearch(params:{query:string;type:string|null;}) {
  try {
    await connectToDB();

    const { query, type } = params;
    const regexQuery = { $regex: query, $options: "i" };

    let results = [];

    const modelsAndTypes = [
      { model: Post, searchField: 'title', type: 'post'},
      { model: User, searchField: 'name', type: 'user'},
      { model: Tag, searchField: 'name', type: 'tag'},
    ]

    const typeLower = type?.toLowerCase();

    if(!typeLower || !SearchableTypes.includes(typeLower)) {
      // SEARCH ACROSS EVERYTHING

      for (const { model, searchField, type } of modelsAndTypes) {
        const queryResults = await model
          .find({ [searchField]: regexQuery })
          .limit(2);

          results.push(
            ...queryResults.map((item) => ({
              title: item[searchField],
              type,
              id: type === 'user'
                ? item.clerkId
                :  item._id
              }))
          )
      }
    } else {
      // SEARCH IN THE SPECIFIED MODEL TYPE
      const modelInfo = modelsAndTypes.find((item) => item.type === type);

      console.log({modelInfo, type});
      if (!modelInfo) {
        throw new Error("Invalid search type");
      }

      const queryResults = await modelInfo.model
        .find({ [modelInfo.searchField]: regexQuery })
        .limit(8);

      results = queryResults.map((item) => ({
        title: item[modelInfo.searchField],
        type,
        id:
          type === "user"
            ? item.clerkId
            : item._id,
      }));
    }
    console.log('RESULT ',results)
    console.log('RESULT STRINGFY ',JSON.stringify(results))

    return JSON.stringify(results);
  } catch (error) {
    console.log(`Error fetching global results, ${error}`);
    throw error;
  }
}