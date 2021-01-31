import { Box, Button } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useRegisterMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { toErrorMap } from "../utils/toErrorMap";

interface registerProps {

}

const Register: React.FC<registerProps> = ({}) => {
    const router = useRouter();
    const [,register] = useRegisterMutation()
    return (
        <Wrapper variant="small">
            <Formik 
                initialValues={{ email: "", username: "", password: "" }}
                onSubmit={async (values, {setErrors}) => {
                    const response = await register({ options: values })
                    if(response.data?.register.errors) {
                        setErrors(toErrorMap(response.data.register.errors))
                    } else if (response.data?.register.user) {
                        router.push("/")
                    }
                }}
            >
                {({isSubmitting}) => (
                    <Form>
                        <InputField 
                            name="username"
                            placeholder="Username"
                            label="Username"
                        />
                        <Box mt={4}>
                        <InputField 
                            name="email"
                            placeholder="Email"
                            label="Email"
                        />  
                        </Box>
                        <Box mt={4}>
                        <InputField 
                            name="password"
                            placeholder="Password"
                            label="Password"
                            type="password"
                        />  
                        </Box>
                        <Button mt={4} type="submit" variantColor="teal" isLoading={isSubmitting}>Register</Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    )
}

export default withUrqlClient(createUrqlClient)(Register)