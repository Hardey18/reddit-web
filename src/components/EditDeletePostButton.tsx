import { Box, IconButton, Link } from '@chakra-ui/core';
import React from 'react'
import NextLink from "next/link";
import { useDeletePostMutation } from '../generated/graphql';

interface EditDeletePostButtonProps {
    id: number
}

export const EditDeletePostButton: React.FC<EditDeletePostButtonProps> = ({
    id,
}) => {
    const [, deletePost] = useDeletePostMutation()
    return (
        <Box>
            <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
                <IconButton
                    as={Link}
                    mr={4}
                    icon="edit" 
                    aria-label="Edit Post"
                />
            </NextLink>
            <IconButton 
                icon="delete" 
                aria-label="Delete Post"
                onClick={() => {
                    deletePost({ id: id })
                }}
            />
        </Box>
    );
}