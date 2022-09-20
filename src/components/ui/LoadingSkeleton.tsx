import React from 'react';
import { Grid, Skeleton } from '@mui/material';

type SkeletonProps = {
  num: number,
};

const LoadingSkeleton
  : React.FC<SkeletonProps> = ({ num }: SkeletonProps) => (
    <>
      {
        Array
          .from(new Array(num))
          .map((_, i) => i)
          .map((n) => (
            <Grid
              key={n}
              item
              xs={1}
            >
              <Skeleton
                variant="rectangular"
                width="100%"
                height={160}
              />
            </Grid>
          ))
      }
    </>
  );

export default LoadingSkeleton;
