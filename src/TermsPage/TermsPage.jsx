import React from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import './term.css';

class TermsPage extends React.Component {

    componentDidMount() {
       // this.props.dispatch(termsActions.getTerms());
        $().ready(function() {
            $(".fakeloader").fadeOut();
        });
    }

    render() {
        return (
            <div className="">
                <div className="container">
                <h1 className="text-center">Terms and Conditions</h1>
                <p>
                  Last updated: February 13, 2018 <br/>
                  Please read these Terms and Conditions ("Terms", "Terms and
                  Conditions") carefully before using the http://ezonseller.com website
                  and the ezonseller mobile application (the "Service") operated by Just
                  Looking Ltd ("us", "we", or "our"). <br/> Your access to and use of the Service is conditioned on your
                  acceptance of and compliance with these Terms. These Terms apply
                  to all visitors, users and others who access or use the Service. <br/> By accessing or using the Service you agree to be bound by these
                  Terms. If you disagree with any part of the terms then you may not
                  access the Service.
                </p>
                  <h1>Purchases</h1>
                <p>
                  You are encouraged to familiarise yourself with your rights contained
                  within the Sale of Goods Act 1979, Unfair Contract Terms Act 1977
                  and the Unfair Terms in Consumer Contracts Regulations 1999.<br/>
                  If you wish to purchase any product or service made available through
                  the Service ("Purchase"), you may be asked to supply certain
                  information relevant to your Purchase including, without limitation, your credit card number, the expiration date of your credit card, your
                  billing address, and your shipping information. <br/> You represent and warrant that: (i) you have the legal right to use any
                  credit card(s) or other payment method(s) in connection with any
                  Purchase; and that (ii) the information you supply to us is true, correct
                  and complete. You expressly agree that Just Looking Ltd is not
                  responsible for any loss or damage arising from the submission of
                  false or inaccurate information. <br/>

                  By submitting such information, you grant us the right to provide the
                  information to third parties for purposes of facilitating the completion
                  of Purchases. Accounts
                </p>
                <h1>Accounts</h1>
                <p>
                  When you create an account with us, you must provide us information
                  that is accurate, complete, and current at all times. Failure to do so
                  constitutes a breach of the Terms, which may result in immediate
                  termination of your account on our Service. <br/> You are responsible for safeguarding the password that you use to
                  access the Service and for any activities or actions under your
                  password, whether your password is with our Service or a third-party
                  service. <br/> You agree not to disclose your password to any third party. You must
                  notify us immediately upon becoming aware of any breach of security
                  or unauthorized use of your account. <br/> You may not use as a username the name of another person or entity
                  or that is not lawfully available for use, a name or trade mark that is
                  subject to any rights of another person or entity other than you without
                  appropriate authorization, or a name that is otherwise offensive, vulgar or obscene. You expressly agree that we cannot be held liable
                  for any loss or damage arising out of any misrepresentations you
                  make in this regard.
                </p>
                <h1>Intellectual Property</h1>
                <p>
                  The Service and its original content, features and functionality are and
                  will remain the exclusive property of Just Looking Ltd and its
                  licensors. The Service is protected by copyright, trademark, and other
                  laws of both the United Kingdom and foreign countries. Our
                  trademarks and trade dress may not be used in connection with any
                  product or service without the prior written consent of Just LookingLtd.
                </p>
                <h1>Links To Other Web Sites</h1>
                <p>
                  Our Service may contain links to third-party web sites or services that
                  are not owned or controlled by Just Looking Ltd.<br/>
                  Just Looking Ltd has no control over, and assumes no responsibility
                  for, the content, privacy policies, or practices of any third party web
                  sites or services.<br/> You further acknowledge and agree that Just
                  Looking Ltd shall not be responsible or liable, directly or indirectly, for
                  any damage or loss caused or alleged to be caused by or in
                  connection with use of or reliance on any such content, goods or
                  services available on or through any such web sites or services. We strongly advise you to read the terms and conditions and privacy
                  policies of any third-party web sites or services that you visit.
                </p>
                <h1>Termination</h1>
                <p>
                  We may terminate or suspend your account immediately, without prior
                  notice or liability, for any reason whatsoever, including without
                  limitation if you breach the Terms. <br/> Upon termination, your right to use the Service will immediately
                  cease. If you wish to terminate your account, you may simply
                  discontinue using the Service.<br/> All provisions of the Terms which by their nature should survive
                  termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations
                  of liability.
                </p>
                <h1>Indemnification</h1>
                <p>
                  You agree to defend, indemnify and hold harmless Just Looking Ltd
                  and its licensee and licensors, and their employees, contractors, agents, officers and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses
                  (including but not limited to attorney's fees), resulting from or arising
                  out of a) your use and access of the Service, by you or any person
                  using your account and password, or b) a breach of these Terms.
                </p>
                <h1>Limitation Of Liability</h1>
                <p>
                  In no event shall Just Looking Ltd, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect,
                  incidental, special, consequential or punitive damages, including
                  without limitation, loss of profits, data, use, goodwill, or other
                  intangible losses, resulting from (i) your access to or use of or inability
                  to access or use the Service; (ii) any conduct or content of any third
                  party on the Service; (iii) any content obtained from the Service; and
                  (iv) unauthorized access, use or alteration of your transmissions or
                  content, whether based on warranty, contract, tort (including
                  negligence) or any other legal theory, whether or not we have been
                  informed of the possibility of such damage, and even if a remedy set
                  forth herein is found to have failed of its essential purpose.
                </p>
                <h1>Disclaimer</h1>
                <p>
                  Your use of the Service is at your sole risk. The Service is provided
                  on an "AS IS" and "AS AVAILABLE" basis. The Service is provided
                  without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a
                  particular purpose, non-infringement or course of performance.<br/>
                  Just Looking Ltd its subsidiaries, affiliates, and its licensors do not
                  warrant that a) the Service will function uninterrupted, secure or
                  available at any particular time or location; b) any errors or defects will
                  be corrected; c) the Service is free of viruses or other harmful
                  components; or d) the results of using the Service will meet your
                  requirements
                </p>
                <h1>Exclusions</h1>
                <p>
                  Without limiting the generality of the foregoing and notwithstanding
                  any other provision of these terms, under no circumstances will Just
                  Looking Ltd ever be liable to you or any other person for any indirect,
                  incidental, consequential, special, punitive or exemplary loss or
                  damage arising from, connected with, or relating to your use of the
                  Service, these Terms, the subject matter of these Terms, the
                  termination of these Terms or otherwise, including but not limited to
                  personal injury, loss of data, business, markets, savings, income, profits, use, production, reputation or goodwill, anticipated or
                  otherwise, or economic loss, under any theory of liability (whether in
                  contract, tort, strict liability or any other theory or law or equity), regardless of any negligence or other fault or wrongdoing (including
                  without limitation gross negligence and fundamental breach) by Just
                  Looking Ltd or any person for whom Just Looking Ltd is responsible, and even if Just Looking Ltd has been advised of the possibility of
                  such loss or damage being incurred.
                </p>
                <h1>Governing Law</h1>
                <p>
                  These Terms shall be governed and construed in accordance with the
                  laws of England and Wales, without regard to its conflict of law
                  provisions.<br/> Our failure to enforce any right or provision of these Terms will not be
                  considered a waiver of those rights. If any provision of these Terms is
                  held to be invalid or unenforceable by a court, the remaining
                  provisions of these Terms will remain in effect. These Terms
                  constitute the entire agreement between us regarding our Service, and supersede and replace any prior agreements we might have
                  between us regarding the Service.
                </p>
                <h1>Changes</h1>
                <p>
                  We reserve the right, at our sole discretion, to modify or replace these
                  Terms at any time. If a revision is material we will try to provide at
                  least 30 days notice prior to any new terms taking effect. What
                  constitutes a material change will be determined at our sole
                  discretion.<br/> By continuing to access or use our Service after those revisions
                  become effective, you agree to be bound by the revised terms. If you
                  do not agree to the new terms, you must stop using the service.
                </p>
                <h1>Privacy Policy and Cookie Policy</h1>
                <p>
                  Please refer to our Privacy Policy and Cookies Policy. You agree that
                  they constitute part of these terms. You must read our Privacy Policy
                  and Cookies Policy before you use the Service.
                </p>
                <h1>Contact Us</h1>
                <p>
                  If you have any questions about these Terms, please contact us.
                </p>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { term } = state;
    return {
        term
    };
}

const connectedProfilePage = connect(mapStateToProps)(TermsPage);
export { connectedProfilePage as TermsPage };
