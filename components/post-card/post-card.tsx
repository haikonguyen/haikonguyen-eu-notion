import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import Image from 'next/image';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import { getCoverSource } from './utils';
import AvatarImage from './avatar-image';
import { PostCardProps } from './types';
import { TagList } from '@components';
import { EuDateFormat, truncateText } from '@utils/text-formatting';

export default function PostCard({ id, cover, properties }: PostCardProps) {
  const router = useRouter();

  return (
    <Card className="rounded-lg" elevation={3}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
            <AvatarImage avatarUrl={properties.author.created_by.avatar_url} />
          </Avatar>
        }
        title={properties.post_name.title[0]?.plain_text}
        subheader={EuDateFormat(properties.published_date.date?.start)}
      />
      <div className="relative h-48">
        <Image
          src={getCoverSource(cover)}
          alt="Id Cover"
          objectFit="cover"
          layout="fill"
          placeholder="blur"
          blurDataURL={getCoverSource(cover)}
        />
      </div>
      <CardContent>
        <Typography
          css={{ minHeight: '120px' }}
          variant="body2"
          color="text.secondary"
        >
          {truncateText(properties.excerpt.rich_text[0]?.plain_text, 160)}
        </Typography>
      </CardContent>
      <CardActions className="flex justify-between" disableSpacing>
        <TagList tags={properties.tags.multi_select} />
        <Button onClick={() => router.push(`post/${id}`)} size="small">
          Read more
        </Button>
      </CardActions>
    </Card>
  );
}
