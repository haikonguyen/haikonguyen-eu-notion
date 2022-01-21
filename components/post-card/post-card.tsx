import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import { PostCardProps } from '@components/post-card/types';
import Image from 'next/image';
import AvatarImage from '@components/post-card/avatar-image';
import Button from '@mui/material/Button';
import TagList from '@components/post-card/tag-list';
import { useRouter } from 'next/router';
import { getCoverSource } from '@components/post-card/utils';

export default function PostCard({ id, cover, properties }: PostCardProps) {
  const router = useRouter();
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
            <AvatarImage avatarUrl={properties.author.created_by.avatar_url} />
          </Avatar>
        }
        title={properties.post_name.title[0].plain_text}
        subheader={properties.published_date.date?.start}
      />
      <div className="relative h-48">
        <Image
          src={getCoverSource(cover)}
          alt="Post Cover"
          objectFit="cover"
          layout="fill"
          placeholder="blur"
          blurDataURL={getCoverSource(cover)}
        />
      </div>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {properties.excerpt.rich_text[0].plain_text}
        </Typography>
      </CardContent>
      <CardActions className="flex justify-between" disableSpacing>
        <TagList tags={properties.tags.multi_select} />
        <Button onClick={() => router.push(`/${id}`)} size="small">
          Read more
        </Button>
      </CardActions>
    </Card>
  );
}
