import React from 'react';
import { Chip, Stack } from '@mui/material';
import { TagListProps } from '@components/post-card/types';

const TagList = ({ tags }: TagListProps) => {
  return (
    <Stack direction="row" spacing={1}>
      {tags.map((tag) => (
        <Chip
          key={tag.id}
          label={tag.name}
          color="primary"
          variant="outlined"
          size="small"
        />
      ))}
    </Stack>
  );
};

export default TagList;
