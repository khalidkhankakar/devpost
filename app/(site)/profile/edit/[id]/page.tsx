import { getUserByClerkId } from '@/lib/actions/user.action';
import UserProfileForm from '@/components/forms/user-profile-form';

export default async function page({
    params,
  }: {
    params: { id: string };
  }) {
    const mongoUser = await getUserByClerkId(params.id);
  return (
    <div>
      <UserProfileForm mongoUser={mongoUser} />
    </div>
  )
}
