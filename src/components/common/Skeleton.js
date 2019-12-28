import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';


function SkeletonCard() {
    return (
        <>
            <Skeleton variant="rect" height={400} />
            <Skeleton variant="text" />
            <Skeleton variant="text" width='60%'/>
            <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                <Skeleton variant="rect" width='30%' />
                <Skeleton variant="rect" width='30%' />
                <Skeleton variant="rect" width='30%' />
            </div>
        </>
    )
}

export default SkeletonCard;