import React from 'react';

const Privacy = () => {
  return (
    <div>
      <div className="flex justify-center items-center py-10">
        <div className="w-full max-w-2xl px-4 text-start">
          <h1 className="text-2xl font-bold mb-6 text-white">Privacy Policy</h1>
          <p className="text-white text-sm leading-relaxed mb-4">
            Welcome to Structify! We value your privacy and are committed to protecting your personal data. This privacy policy outlines how we handle your information when you use our services. Please read it carefully to understand how we collect, use, and protect your personal data.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-4 text-white">1. Information We Collect</h2>
          <p className="text-white text-sm leading-relaxed mb-4">
            We collect information from you when you use our platform, create an account, or interact with us. The information we collect may include:
          </p>
          <ul className="text-white text-sm leading-relaxed mb-4 list-inside list-disc">
            <li>Personal identification information (e.g., name, email address, phone number).</li>
            <li>Business information (e.g., company name, role, business address).</li>
            <li>Payment details for subscription and billing purposes.</li>
            <li>Usage data (e.g., how you interact with our platform, which features you use, etc.).</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-4 text-white">2. How We Use Your Information</h2>
          <p className="text-white text-sm leading-relaxed mb-4">
            The information we collect is used to improve your experience on our platform and to provide you with the best service possible. Specifically, we may use your information for the following purposes:
          </p>
          <ul className="text-white text-sm leading-relaxed mb-4 list-inside list-disc">
            <li>To personalize your experience and tailor the platform to your needs.</li>
            <li>To process transactions and manage your subscription.</li>
            <li>To communicate with you, including responding to inquiries and providing updates about our services.</li>
            <li>To improve the functionality and performance of the platform.</li>
            <li>To comply with legal obligations or enforce our terms of service.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-4 text-white">3. Data Storage and Security</h2>
          <p className="text-white text-sm leading-relaxed mb-4">
            We take your privacy seriously and implement a variety of security measures to protect your personal information. All sensitive data (e.g., payment details) is encrypted and stored securely. We also restrict access to your information to authorized personnel only.
          </p>
          <p className="text-white text-sm leading-relaxed mb-4">
            However, please note that no data transmission over the internet can be guaranteed to be completely secure. While we strive to protect your information, we cannot guarantee the absolute security of any data you transmit to our platform.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-4 text-white">4. Data Retention</h2>
          <p className="text-white text-sm leading-relaxed mb-4">
            We retain your personal data for as long as necessary to fulfill the purposes outlined in this Privacy Policy, including for legal, accounting, or reporting requirements. Once your information is no longer needed, we will take steps to delete it securely.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-4 text-white">5. Sharing Your Information</h2>
          <p className="text-white text-sm leading-relaxed mb-4">
            We do not sell or rent your personal information to third parties. We may share your information with third-party service providers to help operate our platform or process payments, but they will only have access to the information necessary for them to provide those services.
          </p>
          <p className="text-white text-sm leading-relaxed mb-4">
            We may also disclose your information if required by law or if we believe that such action is necessary to comply with legal obligations, protect our rights, or investigate fraud or other illegal activities.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-4 text-white">6. Your Rights and Choices</h2>
          <p className="text-white text-sm leading-relaxed mb-4">
            You have the right to access, correct, or delete your personal data at any time. If you wish to exercise any of these rights, please contact us using the details provided below.
          </p>
          <p className="text-white text-sm leading-relaxed mb-4">
            You also have the right to opt-out of certain types of communication, such as marketing emails. You can update your preferences or unsubscribe at any time by following the instructions included in our emails.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-4 text-white">7. Cookies and Tracking Technologies</h2>
          <p className="text-white text-sm leading-relaxed mb-4">
            We use cookies and similar technologies to improve the performance and user experience of our platform. These technologies help us understand how users interact with our site and allow us to personalize the content and advertisements you see.
          </p>
          <p className="text-white text-sm leading-relaxed mb-4">
            You can control the use of cookies through your browser settings, but please note that disabling cookies may affect the functionality of our platform.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-4 text-white">8. Changes to This Privacy Policy</h2>
          <p className="text-white text-sm leading-relaxed mb-4">
            We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any significant changes by posting an updated policy on this page. We encourage you to review this policy periodically to stay informed about how we protect your information.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-4 text-white">9. Contact Us</h2>
          <p className="text-white text-sm leading-relaxed mb-4">
            If you have any questions or concerns about this Privacy Policy or how we handle your personal data, please do not hesitate to contact us at privacy@structify.com.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
