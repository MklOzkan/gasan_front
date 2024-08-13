import PageHeader from "@/components/common/page-header";
import Spacer from "@/components/common/spacer";
import LoginForm from "@/components/login/loginForm";

const LoginPage = () => {
  return (
    <>
      <PageHeader>Login</PageHeader>
      <Spacer height={200} />
      <LoginForm />
      <Spacer />
    </>
  );
};

export default LoginPage;
