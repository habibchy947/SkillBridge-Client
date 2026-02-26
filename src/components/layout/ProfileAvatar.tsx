import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export default function ProfileAvatar({imgUrl}: {imgUrl: string}) {
  return (
    <Avatar>
      <AvatarImage src={imgUrl} alt="@shadcn" className="" />
      <AvatarFallback>CN</AvatarFallback>
      <AvatarBadge className="bg-green-600 dark:bg-green-800" />
    </Avatar>
  )
}

