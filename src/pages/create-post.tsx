import { Box, Button } from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from "next/router";
import React from 'react';
import { InputField } from '../components/InputField';
import { Layout } from '../components/Layout';
import { useCreatePostMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { useIsAuth } from '../utils/useIsAuth';

const CreatePost: React.FC<{}> = ({}) => {
    const router = useRouter()
    useIsAuth()
    const [, createpost] = useCreatePostMutation()
    return (
        <Layout variant="small">
            <Formik 
                initialValues={{ title: "", text: "" }}
                onSubmit={async (values) => {
                    // console.log(values)
                    const { error } = await createpost({ input: values })
                    if (!error) {
                        router.push("/")
                    }
                }}
            >
            {({isSubmitting}) => (
                <Form>
                    <InputField 
                        name="title"
                        placeholder="Title"
                        label="Title"
                    />
                    <Box mt={4}>
                    <InputField
                        textarea
                        name="text"
                        placeholder="Text..."
                        label="Body"
                    />  
                    </Box>
                    <Button mt={4} type="submit" variantColor="teal" isLoading={isSubmitting}>Create Post</Button>
                </Form>
            )}
        </Formik> 
        </Layout>
    );
}

export default withUrqlClient(createUrqlClient)(CreatePost)