import { useState, useEffect } from 'react'
 // eslint-disable-next-line 
import { useParams, useSearchParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'

function Contact() {
  const [message, setMessage] = useState('');
  const [landlord, setLandlord] = useState(null);
  const params = useParams();

  useEffect(() => {
    const getLandlord = async () => {
      const docRef = doc(db, 'users', params.landlordid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setLandlord(docSnap.data());
      } else {
        toast.error('Could not get the landlord data');
      }
    };

    getLandlord();
  }, [params.landlordid]);

  const onChange = (e) => setMessage(e.target.value);

  const sendEmail = () => {
    // You can customize the subject and body of the email
    const subject = 'Regarding the Rental Property';
    const emailBody = `Dear ${landlord?.name},\n\n${message}`;
    
    // Create a mailto link with the recipient's email, subject, and body
    const mailtoLink = `mailto:${landlord?.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

    // Open the default email client with the mailto link
    window.location.href = mailtoLink;
  };

  return (
    <div className='pageContainer'>
      <header>
        <p className='pageHeader'>Contact Landlord</p>
      </header>

      {landlord !== null && (
        <main>
          <div className='contactLandLord'>
            <p className='landlordName'>Contact {landlord?.name}</p>
          </div>
        </main>
      )}

      <form className='messageForm'>
        <div className='messageDiv'>
          <label htmlFor='message' className='messageLabel'>
            Message
          </label>
          <textarea
            name='message'
            id='message'
            className='textarea'
            value={message}
            onChange={onChange}
          ></textarea>
        </div>

        <div className='buttonDiv'>
          <button type='button' className='primaryButton' onClick={sendEmail}>
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
}

export default Contact;
