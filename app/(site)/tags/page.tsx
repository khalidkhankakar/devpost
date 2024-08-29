import { getAllTags, getTagsByFilters } from "@/lib/actions/tag.action";
import TagCard from "@/components/card/tag-card";
import Filter from "@/components/shared/filter";
import { TAGS_FILTERS } from "@/utils/constant/filters";
import { SearchParamsProps } from "@/types";

export default async function page({ searchParams }: SearchParamsProps) {
  let allTags:any = [];
  if (searchParams?.filter) {
    allTags = await getTagsByFilters(searchParams?.filter);
  } else {
    allTags = await getAllTags();
  }

  return (
    <main className="flex items-center flex-col gap-y-2 w-full mb-32">
      <div className="self-center my-4">
        <Filter filters={TAGS_FILTERS} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allTags.tags.map((tag: any) => {
          return <TagCard tagLink={tag._id} name={tag.name} tagLenght={tag.post.length} key={tag._id} />
        }
      )}
      </div>
    </main>
  );
}
