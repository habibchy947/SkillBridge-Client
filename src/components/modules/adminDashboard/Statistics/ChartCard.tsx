import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ChartCard({
    title,
    children
}:{
    title: String;
    children: React.ReactNode;
}) {
  return (
    <Card className="rounded-sm shadow-sm">
        <CardHeader>
            <CardTitle className="text-base font-semibold">{title}</CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
    </Card>
  )
}
