import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TutorsPublic } from "@/types";
import { Rating } from "@/components/rating";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";


interface ProductCard1Props {
  className?: string;
}

const TutorsPublicCard = ({ tutor }: { tutor: TutorsPublic }) => {

  return (
    <Card className="h-full overflow-hidden p-0 rounded-md">
      <CardHeader className="relative block p-0">
        <AspectRatio ratio={1.268115942} className="overflow-hidden">
           <Image
            src={tutor.user.image}
            fill
            alt="Hero"
            className="object-cover rounded-md"
          />
        </AspectRatio>
      </CardHeader>
      <CardContent className="flex h-full flex-col gap-4 pb-6">
        <CardTitle className="text-xl font-semibold">
          {tutor.user.name}
        </CardTitle>
        <CardDescription className="font-medium text-muted-foreground">
          {tutor.bio}
        </CardDescription>
        <div className="mt-auto">
          <Rating rate={tutor.rating} showScore />
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2">
            {
              tutor.categories.length && (
                tutor.categories.map((category) => <Badge key={category.id} className="bg-green-50 text-green-700 dark:bg-green-950 dark: text-green-300">{category.name}</Badge>)
              )
            }
          </div>
          <Badge asChild className="font-bold">
            <Link href={`tutors/${tutor.id}`}>
              Details <ArrowUpRightIcon data-icon="inline-end" />
            </Link>
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export { TutorsPublicCard };
