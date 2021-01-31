import { Flex, IconButton } from '@chakra-ui/core';
import React, { useState } from 'react'
import { PostSnippetFragment, useVoteMutation } from '../generated/graphql';

interface UpDootSectionProps {
    post: PostSnippetFragment
}

export const UpDootSection: React.FC<UpDootSectionProps> = ({ post }) => {
    const [loadingState, setLoadingState] = useState<'updoot-loading' | 'downdoot-loading' | 'not-loading'>('not-loading')
    const [, vote] = useVoteMutation()
    return (
        <Flex direction="column" justifyContent="center" alignItems="center" mr={4}>
            <IconButton 
                onClick={async () => {
                    if (post.voteStatus === 1) {
                        return
                    }
                    setLoadingState('updoot-loading')
                    await vote({
                        postId: post.id,
                        value: 1
                    })
                    setLoadingState('not-loading')
                }}
                variantColor={post.voteStatus === 1 ? "green" : undefined}
                isLoading={loadingState === 'updoot-loading'}
                aria-label="updoot vote" 
                icon="chevron-up" 
            />
            {post.points}
            <IconButton
                onClick={async () => {
                    if (post.voteStatus === -1) {
                        return
                    }
                    setLoadingState('downdoot-loading')
                    await vote({
                        postId: post.id,
                        value: -1
                    })
                    setLoadingState('not-loading')
                }}
                variantColor={post.voteStatus === -1 ? "red" : undefined}
                isLoading={loadingState === 'downdoot-loading'}
                aria-label="downdoot vote" 
                icon="chevron-down"
            />
        </Flex>
    );
}