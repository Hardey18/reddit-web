import { Box, Button, Flex, Heading, Link } from '@chakra-ui/core';
import React from 'react'
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { isServer } from '../utils/isServer';
import { useRouter } from "next/router"; 

interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({}) => {
    const router = useRouter()
    const [{fetching: logoutFetching}, logout] = useLogoutMutation(); 
    const [{data, fetching}] = useMeQuery({
        pause: isServer()
    })
    let body = null

    // console.log("data: ", data);
    // data is loading
    if (fetching) {

    // user not logged in
    } else if (!data?.me) {
        body = (
            <>
                <NextLink href="/login">
                    <Link mr={4}>Login</Link>
                </NextLink>
                <NextLink href="/register">
                    <Link>Register</Link>
                </NextLink>
            </>
        )
    // user is logged in
    } else {
        body = (
            <Flex align="center">
                <NextLink href="/create-post">
                    <Button as={Link} mr={4}>
                        Create New Post
                    </Button>
                </NextLink>
                <Box mr={4}>{data.me.username}</Box>
                <Button 
                    onClick={async () => {
                        await logout()
                        router.reload
                    }} 
                    isLoading={logoutFetching}
                    variant="link"
                >Logout</Button>
            </Flex>
        )
    }
    return (
        <Flex zIndex={1} position="sticky" top={0} bg="tan" p={4} align="center">
            <Flex flex={1} align="center" maxW={800} m="auto">
                <NextLink href="/">
                    <Link>
                        <Heading>Reddit</Heading>
                    </Link>
                </NextLink>
                <Box ml={'auto'}>
                    {body}
                </Box>
            </Flex>    
        </Flex>
    );
}