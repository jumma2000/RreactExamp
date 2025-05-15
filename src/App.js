import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validatePhone = (phone) => {
    // نمط بسيط للتحقق من صحة رقم الهاتف
    const phonePattern = /^\+?[0-9]{10,15}$/;
    return phonePattern.test(phone);
  };

  const handleOpenWhatsApp = (e) => {
    e.preventDefault();
    
    if (!phoneNumber) {
      setError('الرجاء إدخال رقم الهاتف');
      return;
    }
    
    if (!validatePhone(phoneNumber)) {
      setError('الرجاء إدخال رقم هاتف صالح');
      return;
    }
    
    setError('');
    
    // تنسيق رقم الهاتف (إزالة الرمز + إذا وجد)
    const formattedPhone = phoneNumber.replace(/^\+/, '');
    
    // إنشاء رابط واتساب (بدون رسالة)
    const whatsappUrl = `https://wa.me/${formattedPhone}`;
    
    // فتح الرابط في نافذة جديدة
    window.open(whatsappUrl, '_blank');
    
    setSuccess('تم فتح واتساب بنجاح! يمكنك الآن النقر على زر الاتصال في واتساب');
    setTimeout(() => setSuccess(''), 5000);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <div className="contact-form">
          <h2>الاتصال عبر واتساب</h2>
          
          <form>
            <div className="form-group">
              <label htmlFor="phone">أدخل رقم الهاتف (مع رمز الدولة):</label>
              <input
                type="text"
                id="phone"
                placeholder="مثال: +966512345678"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className={error ? 'error' : ''}
              />
              {error && <p className="error-message">{error}</p>}
              {success && <p className="success-message">{success}</p>}
            </div>
            
            <div className="button-group">
              <button 
                type="button" 
                className="whatsapp-call-button" 
                onClick={handleOpenWhatsApp}
              >
                فتح واتساب للاتصال
              </button>
            </div>
          </form>
          
          <p className="note">
            ملاحظة: سيتم فتح تطبيق واتساب أو واتساب ويب. بعد ذلك، انقر على زر الاتصال في واتساب لإجراء المكالمة.
          </p>
        </div>
        
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
