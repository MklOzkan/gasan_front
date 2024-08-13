import PageHeader from "@/components/common/page-header";
import Spacer from "@/components/common/spacer";
import LoginForm from "@/components/login/loginForm";

const LoginPage = () => {
  return (
    <>
      <PageHeader>Giriş</PageHeader>
      <Spacer height={300} />
      <LoginForm />
      <Spacer />
    </>
  );
};

export default LoginPage;
