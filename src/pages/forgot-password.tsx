import { Box, Button } from '@chakra-ui/core';
import { Formik, Form } from 'formik';
import { withUrqlClient } from 'next-urql';
import React, { useState } from 'react'
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { createUrqlClient } from '../utils/createUrqlClient';
import { useForgotPasswordMutation } from '../generated/graphql';

const ForgotPassword: React.FC<{}> = ({}) => {
    const [complete, setComplete] = useState(false)
    const [, forgotPassword] = useForgotPasswordMutation()
    return (
        <Wrapper variant="small">
            <Formik 
                initialValues={{ email: "" }}
                onSubmit={async (values) => {
                    await forgotPassword(values)
                    setComplete(true)
                }}
            >
                {({isSubmitting}) => 
                    complete ? 
                    <Box>If an account with that Email exists, check to set your password</Box> : (
                    <Form>
                        <Box mt={4}>
                        <InputField 
                            name="email"
                            placeholder="Email"
                            label="Email"
                            type="email"
                        />  
                        </Box>
                        <Button mt={4} type="submit" variantColor="teal" isLoading={isSubmitting}>Forgot Password</Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
}

export default withUrqlClient(createUrqlClient)(ForgotPassword)