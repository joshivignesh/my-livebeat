import { useEffect } from 'react';
import { verifySession } from '@/lib/auth';
import Container from '@/components/Container';
import { account } from '@/lib/appwrite';
import { type } from 'os';
import { useLocation } from 'wouter';
import { useAuth } from '@/hooks/use-auth';

function Session() {
  const{ verifySession } = useAuth();
  const[,navigate] = useLocation();

useEffect(() => {
const urlParams = new URLSearchParams(window.location.search);
const secret = urlParams.get('secret');
const userId = urlParams.get('userId');

if(typeof userId!== 'string' || typeof secret!== 'string') {
  navigate('/login');
  return;
}

(async function run() {
  await verifySession({userId, secret});
  navigate('/');
})();

}, [])

  return (
    <Container className="h-screen flex items-center justify-center text-center">
      <p>Logging you in...</p>
    </Container>
  )
}

export default Session;