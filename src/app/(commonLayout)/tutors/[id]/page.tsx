import { Rating } from "@/components/rating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { tutorServices } from "@/services/tutor.service";
import { Calendar, DollarSign } from "lucide-react";

export default async function TutorDetailsPage({ params, }: { params: Promise<{ id: string }>; }) {
  const { id } = await params;
  const result = await tutorServices.getTutorById(id)
  const tutor = result?.data?.data
  console.log(tutor)
  return (
    <div>
      <div className="container mx-auto px-5 lg:px-0 py-10 space-y-10">
        {/* Top Section */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* LEFT - Tutor Image */}
          <div className="md:col-span-1">
            <Card className="overflow-hidden">
              <img
                src={tutor.user.image}
                alt={tutor.user.name}
                className="w-full h-96 object-cover"
              />
            </Card>
          </div>

          {/* RIGHT - Info */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h1 className="text-3xl font-bold">
                {tutor.user.name}
              </h1>

              <div className="mt-2">
                <Rating
                  rate={tutor.rating}
                  showScore
                  description={`${tutor.totalReviews} reviews`}
                />
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {tutor.bio}
            </p>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {tutor.categories?.map((cat: any) => (
                <Badge key={cat.id} variant="secondary">
                  {cat.name}
                </Badge>
              ))}
            </div>

            {/* Pricing + Availability */}
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <DollarSign size={16} />
                <span className="font-semibold">
                  ${tutor.hourlyRate} / Hour
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>
                  Available: {tutor.availability || "Flexible"}
                </span>
              </div>
            </div>

            <Button size="lg" className="rounded-xl px-8">
              Book Session
            </Button>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">
            Student Reviews
          </h2>

          {tutor.reviews?.length === 0 && (
            <p className="text-muted-foreground">
              No reviews yet.
            </p>
          )}

          {/* <div className="space-y-4">
            {tutor.reviews?.map((review: any) => (
              <Card key={review.id}>
                <CardHeader>
                  <CardTitle className="text-base">
                    {review.student.name}
                  </CardTitle>
                  <Rating rate={review.rating} showScore />
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {review.comment}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  )
}
