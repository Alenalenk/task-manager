import { Comment } from "@/lib/generated/prisma/client";

type CommentListProp = {
    data: Comment[]
}
export default function CommentList({ data }: CommentListProp) {
    return (
        <div className="">
            <ul>
                {data.map(item => {
                    const { id, comment } = item;
                    return (
                        <li key={id}>
                            {comment}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}