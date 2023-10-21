import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import Layout from '@/components/Layout';
import Container from '@/components/Container';
import FormRow from '@/components/FormRow';
import FormLabel from '@/components/FormLabel';
import InputText from '@/components/InputText';
import Button from '@/components/Button';
import { Redirect } from 'wouter';

function LogIn() {
  const {session, logIn} = useAuth();
const [sent, setSent] = useState(false);

  async function handleOnSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      email:  {value:string}
    }
    await logIn(target.email.value);
    setSent(true);
  }

  if(session)
  { return <Redirect to={`${location.origin}/`}></Redirect> }

  return (
    <Layout>
      <Container>
        <h1 className="text-3xl font-bold text-center mb-6">
          Log In
        </h1>
        {!sent && (
            <form className="max-w-xs border border-slate-200 dark:border-slate-500 rounded p-6 mx-auto" onSubmit={handleOnSubmit}>
          <FormRow className="mb-5">
            <FormLabel htmlFor="email">Email</FormLabel>
            <InputText id="email" name="email" type="email" />
          </FormRow>

          <Button>Submit</Button>
        </form>
        )}
        {sent && (
          <p className='text-center'>Check your email for a magic link!</p>
        )

        }
      
      </Container>
    </Layout>
  )
}

export default LogIn;