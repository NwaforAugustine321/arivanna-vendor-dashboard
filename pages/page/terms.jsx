import React from 'react';
import ContainerPage from '~/components/layouts/ContainerPage';
import BreadCrumb from '~/components/elements/BreadCrumb';

const TermsContect = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Terms & Conditions',
        },
    ];

    return (
        <ContainerPage title="Page not found." boxed={true}>
            <BreadCrumb breacrumb={breadCrumb} />

            <div className="ps-contact-info">
                <div className="container black_text">
                    <div className="ps-section__header">
                        <h2 className="order-in-past">Terms & Conditions</h2>
                        <br />
                        <br />
                        <p>
                            These terms and conditions (the "Terms and Conditions") govern the use of www.arivanna.com (the "Site"). This Site is owned and operated by Utopia Tech PTY LTD. This Site is an ecommerce website.
                        </p>
                        <p>
                            By using this Site, you indicate that you have read and understand these Terms and Conditions and agree to abide by them at all times.
                        </p>
                        <b>
                            THESE TERMS AND CONDITIONS CONTAIN A DISPUTE RESOLUTION CLAUSE THAT IMPACTS YOUR RIGHTS ABOUT HOW TO RESOLVE DISPUTES. PLEASE READ IT CAREFULLY.
                        </b>
                    </div>
                    <br/>
                    <div className="ps-section__content">
                        <br/>
                        <h4>Intellectual Property</h4>
                        <p>
                            All content published and made available on our Site is the property of Utopia Tech PTY LTD and the Site's creators. This includes, but is not limited to images, text, logos, documents, downloadable files and anything that contributes to the composition of our Site.
                        </p>
                        <br/>
                        <h4>Acceptable Use</h4>
                        <p>
                            As a user of our Site, you agree to use our Site legally, not to use our Site for illegal purposes, and not to:
                        </p>
                        <ul>
                            <li>Harass or mistreat other users of our Site.</li>
                            <li>Violate the rights of other users of our Site.</li>
                            <li>Violate the intellectual property rights of the Site owners or any third party to the Site.</li>
                            <li>Hack into the account of another user of the Site.</li>
                            <li>Act in any way that could be considered fraudulent. Or</li>
                            <li>Post any material that may be deemed inappropriate or offensive.</li>
                        </ul>
                        <p>
                            If we believe you are using our Site illegally or in a manner that violates these Terms and Conditions, we reserve the right to limit, suspend or terminate your access to our Site. We also reserve the right to take any legal steps necessary to prevent you from accessing our Site.
                        </p>
                        <br/>
                        <h4>User Contributions</h4>
                        <p>
                            Users may post the following information on our Site:
                        </p>
                        <ul>
                            <li>Items for sale.</li>
                            <li>Photos.</li>
                            <li>Videos. And</li>
                            <li>Public comments.</li>
                        </ul>
                        <p>
                            By posting publicly on our Site, you agree not to act illegally or violate these Terms and Conditions.
                        </p>
                        <br/>
                        <h4>Accounts</h4>
                        <p>
                            When you create an account on our Site, you agree to the following:
                        </p>
                        <ol>
                            <li>You are solely responsible for your account and the security and privacy of your account, including passwords or sensitive information attached to that account. and</li>
                            <li>All personal information you provide to us through your account is up to date, accurate, and truthful and that you will update your personal information if it changes. We reserve the right to suspend or terminate your account if you are using our Site illegally or if you violate these Terms and Conditions.</li>
                        </ol>

                        <br/>
                        <h4>Sale of Goods</h4>
                        <p>
                            These Terms and Conditions govern the sale of goods available on our Site.
                        </p>
                        <p>
                            The following goods are available on our Site:
                        </p>
                        <ul>
                            <li>Various</li>
                        </ul>
                        <p>
                            These Terms and Conditions apply to all the goods that are displayed on our Site at the time you access it. This includes all products listed as being out of stock. All information, descriptions, or images that we provide about our goods are as accurate as possible. However, we are not legally bound by such information, descriptions, or images as we cannot guarantee the accuracy of all goods we provide. You agree to purchase goods from our Site at your own risk.
                        </p>
                        <p>
                            We reserve the right to modify, reject or cancel your order whenever it becomes necessary. If we cancel your order and have already processed your payment, we will give you a refund equal to the amount you paid. You agree that it is your responsibility to monitor your payment instrument to verify receipt of any refund.
                        </p>
                        <br/>
                        <h4>Third Party Goods and Services</h4>
                        <p>
                            Our Site may offer goods and services from third parties. We cannot guarantee the quality or accuracy of goods and services made available by third parties on our Site.
                        </p>
                        <br/>
                        <h4>User Goods and Services</h4>
                        <p>
                            Our Site allows users to sell goods and services. We do not assume any responsibility for the goods and services users sell on our Site. We cannot guarantee the quality or accuracy of any goods and services sold by users on our Site. However, if we are made aware that a user is violating these Terms and Conditions, we reserve the right to suspend or prohibit the user from selling goods and services on our Site.
                        </p>
                        <br/>
                        <h4>Subscriptions</h4>
                        <p>
                            Your subscription automatically renews and you will be automatically billed until we receive notification that you want to cancel the subscription.
                        </p>
                        <p>
                            To cancel your subscription, please follow these steps: Users can cancel their membership at any time through the membership cancellation process from their account overview page.
                        </p>
                        <br/>
                        <h4>Payments</h4>
                        <p>
                            We accept the following payment methods on our Site:                        </p>
                        <ul>
                            <li>PayPal. and</li>
                            <li>Various others.</li>
                        </ul>
                        <p>
                            When you provide us with your payment information, you authorise our use of and access to the payment instrument you have chosen to use. By providing us with your payment information, you authorise us to charge the amount due to this payment instrument.
                        </p>
                        <p>
                            If we believe your payment has violated any law or these Terms and Conditions, we reserve the right to cancel or reverse your transaction.
                        </p>
                        <br/>
                        <h4>Shipping and Delivery</h4>
                        <p>
                            When you purchase goods from our Site, the goods will be delivered through one of the following methods:
                        </p>
                        <ul>
                            <li>Various options. Vendor handles the shipping. Delivery takes 1 to 60+ depending on various factors such as shipping method and distance.</li>
                        </ul>
                        <p>
                            Delivery will take place as soon as reasonably possible, depending on the delivery method selected. Delivery times may vary due to unforeseen circumstances. Please note that delivery times do not include weekends and public holidays.
                        </p>
                        <p>
                            You will be required to pay delivery charges in addition to the price for the goods you purchase.
                        </p>
                        <p>
                            If you purchase goods from us for delivery to a destination outside Australia your purchase may be subject to import duties and taxes applied by the destination country. You are responsible for paying any such duties or taxes. Please contact your local customs office for more information before making a purchase. We are not responsible for the payment of any such duties or taxes and are not liable for any failure by you to pay them.
                        </p>
                        <p>
                            You are required to provide us with a complete and accurate delivery address, including the name of the recipient. We are not liable for the delivery of your goods to the wrong address or wrong person as a result of you providing us with inaccurate or incomplete information.
                        </p>
                        <br/>
                        <h4>Refunds</h4>
                        <h5>Refunds for Goods</h5>
                        <p>
                            Refund requests must be made within 30 days after receipt of your goods.
                        </p>
                        <p>
                            We accept refund requests for goods sold on our Site for any of the following reasons:
                        </p>
                        <ul>
                            <li>Good is broken.</li>
                            <li>Good does not match description.</li>
                            <li>Good is the wrong size.</li>
                            <li>Purchaser changed their mind. or</li>
                            <li>Good does not meet the purchaser's expectations.</li>
                        </ul>
                        <p>
                            Refunds do not apply to the following goods:
                        </p>
                        <ul>
                            <li>Personal and Perishable Items Intimate Apparel Body Jewelry Products containing food items Flowers and Plants.</li>
                        </ul>
                        <p>
                            For further clarification on returns, refunds and exchanges, refer to our returns, refunds and exchanges policy.
                        </p>
                        <br/>
                        <h4>Returns</h4>
                        <p>
                            Returns can be made by mail. To return a good by mail, follow the following procedure:
                        </p>
                        <a>
                            Refer to returns, refunds and exchanges for more information.
                        </a>
                        <br/>
                        <h4>Consumer Protection Law</h4>
                        <p>
                            Where the Australian Consumer Law, Schedule 2 of the Competition and Consumer Act 2010, or any other consumer protection legislation in your jurisdiction applies and cannot be excluded, these Terms and Conditions will not limit your legal rights and remedies under that legislation. These Terms and Conditions will be read subject to the mandatory provisions of that legislation. If there is a conflict between these Terms and Conditions and that legislation, the mandatory provisions of the legislation will apply.
                        </p>
                        <br/>
                        <h4>Links to Other Websites</h4>
                        <p>
                            Our Site contains links to third party websites or services that we do not own or control. We are not responsible for the content, policies, or practices of any third party website or service linked to on our Site. It is your responsibility to read the terms and conditions and privacy policies of these third party websites before using these sites.
                        </p>
                        <br/>
                        <h4>Limitation of Liability</h4>
                        <p>
                            Utopia Tech PTY LTD and our directors, officers, agents, employees, subsidiaries, and affiliates will not be liable for any actions, claims, losses, damages, liabilities and expenses including legal fees from your use of the Site.
                        </p>
                        <br/>
                        <h4>Indemnity</h4>
                        <p>
                            Except where prohibited by law, by using this Site you indemnify and hold harmless Utopia Tech PTY LTD and our directors, officers, agents, employees, subsidiaries, and affiliates from any actions, claims, losses, damages, liabilities and expenses including legal fees arising out of your use of our Site or your violation of these Terms and Conditions.
                        </p>
                        <br/>
                        <h4>Applicable Law</h4>
                        <p>
                            These Terms and Conditions are governed by the laws of the State of Queensland.
                        </p>
                        <br/>
                        <h4>Dispute Resolution</h4>
                        <p>
                            Subject to any exceptions specified in these Terms and Conditions, if you and Utopia Tech PTY LTD are unable to resolve any dispute through informal discussion, then you and Utopia Tech PTY LTD agree to submit the issue first before a non-binding mediator and to an arbitrator in the event that mediation fails. The decision of the arbitrator will be final and binding. Any mediator or arbitrator must be a neutral party acceptable to both you and Utopia Tech PTY LTD.
                        </p>
                        <p>
                            Notwithstanding any other provision in these Terms and Conditions, you and Utopia Tech PTY LTD agree that you both retain the right to bring an action in small claims court and to bring an action for injunctive relief or intellectual property infringement.
                        </p>
                        <br/>
                        <h4>Additional Terms</h4>
                        <p>
                            Refer to policies.
                        </p>
                        <br/>
                        <h4>Severability</h4>
                        <p>
                            If at any time any of the provisions set forth in these Terms and Conditions are found to be inconsistent or invalid under applicable laws, those provisions will be deemed void and will be removed from these Terms and Conditions. All other provisions will not be affected by the removal and the rest of these Terms and Conditions will still be considered valid.
                        </p>
                        <br/>
                        <h4>Changes</h4>
                        <p>
                            These Terms and Conditions may be amended from time to time in order to maintain compliance with the law and to reflect any changes to the way we operate our Site and the way we expect users to behave on our Site. We will notify users by email of changes to these Terms and Conditions or post a notice on our Site.
                        </p>
                        <br/>
                        <h4>Contact Details</h4>
                        <p>
                            Please contact us if you have any questions or concerns. Our contact details are as follows:
                        </p>
                        <p>
                            <a href="mailto: customercare@utopiatech.io">
                            customercare@utopiatech.io
                            </a> Queensland Australia
                        </p>
                        <p>
                            You can also contact us through the feedback form available on our Site.
                        </p>
                        <p className="order-in-end">
                            Effective Date: 29th day of June, 2021
                        </p>

                        --------------------------------------------------------------------------------------
                        <p dir="ltr" style={{lineHeight: '1.38', marginTop: '0pt', marginBottom: '0pt'}}><span style={{fontSize: '13pt', fontFamily: 'Arial', color: '#000000', backgroundColor: 'transparent', fontWeight: 700, fontStyle: 'normal', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre-wrap'}}>Returns, Refunds and Exchanges Policy</span></p>
        
        
        <p><br /></p>
        <ul style={{marginTop: 0, marginBottom: 0, paddingInlineStart: '48px'}}>
          <li aria-level={1} dir="ltr" style={{listStyleType: 'disc', fontSize: '9pt', fontFamily: 'Arial', color: '#000000', backgroundColor: 'transparent', fontWeight: 400, fontStyle: 'italic', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre'}}>
            <p dir="ltr" style={{lineHeight: '1.38', backgroundColor: '#ffffff', marginTop: '10pt', marginBottom: '0pt'}}><span style={{fontSize: '11.5pt', fontFamily: 'Arial', color: '#000000', backgroundColor: 'transparent', fontWeight: 400, fontStyle: 'italic', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre-wrap'}}>If you are not 100% satisfied with your purchase, you can return the product and get a full refund or exchange the product for another one, be it similar or not.</span></p>
          </li>
          <li aria-level={1} dir="ltr" style={{listStyleType: 'disc', fontSize: '9pt', fontFamily: 'Arial', color: '#000000', backgroundColor: 'transparent', fontWeight: 400, fontStyle: 'italic', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre'}}>
            <p dir="ltr" style={{lineHeight: '1.38', backgroundColor: '#ffffff', marginTop: '0pt', marginBottom: '0pt', padding: '10pt 0pt 0pt 0pt'}}><span style={{fontSize: '11.5pt', fontFamily: 'Arial', color: '#000000', backgroundColor: 'transparent', fontWeight: 400, fontStyle: 'italic', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre-wrap'}}>You can return a product for up to 30 days from the date you purchased it.</span></p>
          </li>
          <li aria-level={1} dir="ltr" style={{listStyleType: 'disc', fontSize: '9pt', fontFamily: 'Arial', color: '#000000', backgroundColor: 'transparent', fontWeight: 400, fontStyle: 'italic', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre'}}>
            <p dir="ltr" style={{lineHeight: '1.38', backgroundColor: '#ffffff', marginTop: '0pt', marginBottom: '0pt', padding: '10pt 0pt 19pt 0pt'}}><span style={{fontSize: '11.5pt', fontFamily: 'Arial', color: '#000000', backgroundColor: 'transparent', fontWeight: 400, fontStyle: 'italic', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre-wrap'}}>Any product you return must be in the same condition you received it and in the original packaging.&nbsp;</span></p>
          </li>
          <li aria-level={1} dir="ltr" style={{listStyleType: 'disc', fontSize: '9pt', fontFamily: 'Arial', color: '#000000', backgroundColor: 'transparent', fontWeight: 400, fontStyle: 'italic', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre'}}>
            <p dir="ltr" style={{lineHeight: '1.38', backgroundColor: '#ffffff', marginTop: '0pt', marginBottom: '19pt', padding: '-9pt 0pt 0pt 0pt'}}><span style={{fontSize: '11.5pt', fontFamily: 'Arial', color: '#000000', backgroundColor: 'transparent', fontWeight: 400, fontStyle: 'italic', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre-wrap'}}>If the product is returned due to change of mind, the buyer covers the return shipping costs.</span></p>
          </li>
        </ul>
        <p dir="ltr" style={{lineHeight: '1.38', backgroundColor: '#ffffff', marginTop: '10pt', marginBottom: '0pt', padding: '0pt 0pt 19pt 0pt'}}>&nbsp;</p>
        <p dir="ltr" style={{lineHeight: '1.38', backgroundColor: '#ffffff', marginTop: '0pt', marginBottom: '0pt', padding: '-9pt 0pt 19pt 0pt'}}><span style={{fontSize: '12.499999999999998pt', fontFamily: 'Arial', color: '#000000', backgroundColor: 'transparent', fontWeight: 700, fontStyle: 'italic', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre-wrap'}}>Returns</span></p>
        <p dir="ltr" style={{lineHeight: '1.38', backgroundColor: '#ffffff', marginTop: '0pt', marginBottom: '0pt', padding: '-9pt 0pt 19pt 0pt'}}><span style={{fontSize: '11.5pt', fontFamily: 'Arial', color: '#000000', backgroundColor: 'transparent', fontWeight: 400, fontStyle: 'normal', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre-wrap'}}>Product returns can either be a full refund, exchange or Arivanna credit. The refund and Arivanna credit will only be issued once the returned products are received by the vendor and confirmed to be in the original condition. If an exchange is requested, the new products will only be shipped to you once the returned products are received by the vendor and confirmed to be in the original condition.</span></p>
        <p dir="ltr" style={{lineHeight: '1.38', backgroundColor: '#ffffff', marginTop: '0pt', marginBottom: '0pt', padding: '-9pt 0pt 19pt 0pt'}}><span style={{fontSize: '11.5pt', fontFamily: 'Arial', color: '#000000', backgroundColor: 'transparent', fontWeight: 400, fontStyle: 'normal', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre-wrap'}}>In rare instances depending on the reason for the return request, the type of item and other reasonable various factors, Arivanna reserves the right to reject the return request.&nbsp;</span></p>
        <p dir="ltr" style={{lineHeight: '1.38', backgroundColor: '#ffffff', marginTop: '0pt', marginBottom: '0pt', padding: '-9pt 0pt 19pt 0pt'}}><span style={{fontSize: '12.499999999999998pt', fontFamily: 'Arial', color: '#000000', backgroundColor: 'transparent', fontWeight: 700, fontStyle: 'normal', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre-wrap'}}>Return Reasons</span></p>
        <p dir="ltr" style={{lineHeight: '1.38', backgroundColor: '#ffffff', marginTop: '0pt', marginBottom: '19pt', padding: '-9pt 0pt 0pt 0pt'}}><span style={{fontSize: '11.5pt', fontFamily: 'Arial', color: '#000000', backgroundColor: 'transparent', fontWeight: 700, fontStyle: 'normal', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre-wrap'}}>Change of mind</span><span style={{fontSize: '11.5pt', fontFamily: 'Arial', color: '#000000', backgroundColor: 'transparent', fontWeight: 400, fontStyle: 'normal', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre-wrap'}}>:</span></p>
        <ul style={{marginTop: 0, marginBottom: 0, paddingInlineStart: '48px'}}>
          <li aria-level={1} dir="ltr" style={{listStyleType: 'disc', fontSize: '11.5pt', fontFamily: 'Arial', color: '#000000', backgroundColor: 'transparent', fontWeight: 400, fontStyle: 'normal', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre'}}>
            <p dir="ltr" style={{lineHeight: '1.38', backgroundColor: '#ffffff', marginTop: '10pt', marginBottom: '0pt'}}><span style={{fontSize: '11.5pt', fontFamily: 'Arial', color: '#000000', backgroundColor: 'transparent', fontWeight: 400, fontStyle: 'normal', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre-wrap'}}>The order is in “pending” status (The vendor has not shipped the item) Or</span></p>
          </li>
          <li aria-level={1} dir="ltr" style={{listStyleType: 'disc', fontSize: '11.5pt', fontFamily: 'Arial', color: '#000000', backgroundColor: 'transparent', fontWeight: 400, fontStyle: 'normal', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre'}}>
            <p dir="ltr" style={{lineHeight: '1.38', backgroundColor: '#ffffff', marginTop: '0pt', marginBottom: '19pt'}}><span style={{fontSize: '11.5pt', fontFamily: 'Arial', color: '#000000', backgroundColor: 'transparent', fontWeight: 400, fontStyle: 'normal', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre-wrap'}}>The product was received, is unopened, undamaged and in its original condition.</span></p>
          </li>
        </ul>
        <p dir="ltr" style={{lineHeight: '1.38', backgroundColor: '#ffffff', marginTop: '10pt', marginBottom: '19pt'}}><span style={{fontSize: '11.5pt', fontFamily: 'Arial', color: '#000000', backgroundColor: 'transparent', fontWeight: 700, fontStyle: 'normal', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre-wrap'}}>Faulty:</span></p>
        <ul style={{marginTop: 0, marginBottom: 0, paddingInlineStart: '48px'}}>
          <li aria-level={1} dir="ltr" style={{listStyleType: 'disc', fontSize: '11.5pt', fontFamily: 'Arial', color: '#000000', backgroundColor: 'transparent', fontWeight: 400, fontStyle: 'normal', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre'}}>
            <p dir="ltr" style={{lineHeight: '1.38', backgroundColor: '#ffffff', marginTop: '10pt', marginBottom: '0pt'}}><span style={{fontSize: '11.5pt', fontFamily: 'Arial', color: '#000000', backgroundColor: 'transparent', fontWeight: 400, fontStyle: 'normal', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre-wrap'}}>The order is in “received” status (The vendor has not shipped the item) and</span></p>
          </li>
          <li aria-level={1} dir="ltr" style={{listStyleType: 'disc', fontSize: '11.5pt', fontFamily: 'Arial', color: '#000000', backgroundColor: 'transparent', fontWeight: 400, fontStyle: 'normal', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre'}}>
            <p dir="ltr" style={{lineHeight: '1.56', backgroundColor: '#ffffff', marginTop: '0pt', marginBottom: '26pt'}}><span style={{fontSize: '11.5pt', fontFamily: 'Arial', color: '#000000', backgroundColor: 'transparent', fontWeight: 400, fontStyle: 'normal', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre-wrap'}}>Is NOT fit for the purpose for which it is commonly used; NOT safe, durable and free from defects; NOT acceptable in appearance and finish.</span></p>
          </li>
        </ul>
        <p dir="ltr" style={{lineHeight: '1.38', backgroundColor: '#ffffff', marginTop: '10pt', marginBottom: '19pt'}}><span style={{fontSize: '11.5pt', fontFamily: 'Arial', color: '#000000', backgroundColor: 'transparent', fontWeight: 700, fontStyle: 'normal', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre-wrap'}}>Misleading product advertisement:</span></p>
        <ul style={{marginTop: 0, marginBottom: 0, paddingInlineStart: '48px'}}>
          <li aria-level={1} dir="ltr" style={{listStyleType: 'disc', fontSize: '11.5pt', fontFamily: 'Arial', color: '#000000', backgroundColor: 'transparent', fontWeight: 400, fontStyle: 'normal', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre'}}>
            <p dir="ltr" style={{lineHeight: '1.38', backgroundColor: '#ffffff', marginTop: '10pt', marginBottom: '0pt'}}><span style={{fontSize: '11.5pt', fontFamily: 'Arial', color: '#000000', backgroundColor: 'transparent', fontWeight: 400, fontStyle: 'normal', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre-wrap'}}>The order is in “received” status (The vendor has not shipped the item) and</span></p>
          </li>
          <li aria-level={1} dir="ltr" style={{listStyleType: 'disc', fontSize: '11.5pt', fontFamily: 'Arial', color: '#000000', backgroundColor: 'transparent', fontWeight: 400, fontStyle: 'normal', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre'}}>
            <p dir="ltr" style={{lineHeight: '1.38', backgroundColor: '#ffffff', marginTop: '0pt', marginBottom: '19pt'}}><span style={{fontSize: '11.5pt', fontFamily: 'Arial', color: '#000000', backgroundColor: 'transparent', fontWeight: 400, fontStyle: 'normal', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre-wrap'}}>Where the product listing provides false or misleading claims on the product.</span></p>
          </li>
        </ul>
        <p dir="ltr" style={{lineHeight: '1.38', backgroundColor: '#ffffff', marginTop: '10pt', marginBottom: '19pt'}}><span style={{fontSize: '11.5pt', fontFamily: 'Arial', color: '#000000', backgroundColor: 'transparent', fontWeight: 700, fontStyle: 'normal', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre-wrap'}}>Damaged Products:</span></p>
        <ul style={{marginTop: 0, marginBottom: 0, paddingInlineStart: '48px'}}>
          <li aria-level={1} dir="ltr" style={{listStyleType: 'disc', fontSize: '11.5pt', fontFamily: 'Arial', color: '#000000', backgroundColor: 'transparent', fontWeight: 400, fontStyle: 'normal', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre'}}>
            <p dir="ltr" style={{lineHeight: '1.38', backgroundColor: '#ffffff', marginTop: '10pt', marginBottom: '19pt'}}><span style={{fontSize: '11.5pt', fontFamily: 'Arial', color: '#000000', backgroundColor: 'transparent', fontWeight: 400, fontStyle: 'normal', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre-wrap'}}>The Product received in the Damaged condition</span></p>
          </li>
        </ul>
        <p dir="ltr" style={{lineHeight: '1.38', backgroundColor: '#ffffff', marginTop: '10pt', marginBottom: '0pt', padding: '0pt 0pt 19pt 0pt'}}><span style={{fontSize: '12.499999999999998pt', fontFamily: 'Arial', color: '#000000', backgroundColor: 'transparent', fontWeight: 700, fontStyle: 'normal', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre-wrap'}}>Refund Amount</span></p>
        <p dir="ltr" style={{lineHeight: '1.38', backgroundColor: '#ffffff', marginTop: '0pt', marginBottom: '0pt', padding: '-9pt 0pt 19pt 0pt'}}><span style={{fontSize: '11.5pt', fontFamily: 'Arial', color: '#000000', backgroundColor: 'transparent', fontWeight: 400, fontStyle: 'normal', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre-wrap'}}>If the refund reason is “faulty” or “False or misleading claim” then the full refund amount will be given.</span></p>
        <p dir="ltr" style={{lineHeight: '1.38', backgroundColor: '#ffffff', marginTop: '0pt', marginBottom: '0pt', padding: '-9pt 0pt 19pt 0pt'}}><span style={{fontSize: '11.5pt', fontFamily: 'Arial', color: '#000000', backgroundColor: 'transparent', fontWeight: 400, fontStyle: 'normal', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre-wrap'}}>If the refund reason is due to “change of mind” then only the paid product price excluding shipping will be given.</span></p>
        <p dir="ltr" style={{lineHeight: '1.38', backgroundColor: '#ffffff', marginTop: '0pt', marginBottom: '0pt', padding: '-9pt 0pt 19pt 0pt'}}><span style={{fontSize: '12.499999999999998pt', fontFamily: 'Arial', color: '#000000', backgroundColor: 'transparent', fontWeight: 700, fontStyle: 'normal', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre-wrap'}}>Postage Costs&nbsp;</span></p>
        <p dir="ltr" style={{lineHeight: '1.38', backgroundColor: '#ffffff', marginTop: '0pt', marginBottom: '19pt', padding: '-9pt 0pt 0pt 0pt'}}><span style={{fontSize: '11.5pt', fontFamily: 'Arial', color: '#000000', backgroundColor: 'transparent', fontWeight: 700, fontStyle: 'normal', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre-wrap'}}>Change of mind:</span></p>
        <ul style={{marginTop: 0, marginBottom: 0, paddingInlineStart: '48px'}}>
          <li aria-level={1} dir="ltr" style={{listStyleType: 'disc', fontSize: '11.5pt', fontFamily: 'Arial', color: '#000000', backgroundColor: 'transparent', fontWeight: 400, fontStyle: 'normal', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre'}}>
            <p dir="ltr" style={{lineHeight: '1.38', backgroundColor: '#ffffff', marginTop: '10pt', marginBottom: '19pt'}}><span style={{fontSize: '11.5pt', fontFamily: 'Arial', color: '#000000', backgroundColor: 'transparent', fontWeight: 400, fontStyle: 'normal', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre-wrap'}}>Covered by the buyer.</span></p>
          </li>
        </ul>
        <p dir="ltr" style={{lineHeight: '1.38', backgroundColor: '#ffffff', marginTop: '10pt', marginBottom: '19pt'}}><span style={{fontSize: '11.5pt', fontFamily: 'Arial', color: '#000000', backgroundColor: 'transparent', fontWeight: 700, fontStyle: 'normal', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre-wrap'}}>Faulty</span><span style={{fontSize: '12.499999999999998pt', fontFamily: 'Arial', color: '#000000', backgroundColor: 'transparent', fontWeight: 700, fontStyle: 'normal', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre-wrap'}}>:</span></p>
        <ul style={{marginTop: 0, marginBottom: 0, paddingInlineStart: '48px'}}>
          <li aria-level={1} dir="ltr" style={{listStyleType: 'disc', fontSize: '11.5pt', fontFamily: 'Arial', color: '#000000', backgroundColor: 'transparent', fontWeight: 400, fontStyle: 'normal', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre'}}>
            <p dir="ltr" style={{lineHeight: '1.38', backgroundColor: '#ffffff', marginTop: '10pt', marginBottom: '19pt'}}><span style={{fontSize: '11.5pt', fontFamily: 'Arial', color: '#000000', backgroundColor: 'transparent', fontWeight: 400, fontStyle: 'normal', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre-wrap'}}>Covered by the vendor.</span></p>
          </li>
        </ul>
        <p dir="ltr" style={{lineHeight: '1.38', backgroundColor: '#ffffff', marginTop: '10pt', marginBottom: '19pt'}}><span style={{fontSize: '11.5pt', fontFamily: 'Arial', color: '#000000', backgroundColor: 'transparent', fontWeight: 700, fontStyle: 'normal', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre-wrap'}}>Misleading product advertisement:</span></p>
        <ul style={{marginTop: 0, marginBottom: 0, paddingInlineStart: '48px'}}>
          <li aria-level={1} dir="ltr" style={{listStyleType: 'disc', fontSize: '11.5pt', fontFamily: 'Arial', color: '#000000', backgroundColor: 'transparent', fontWeight: 400, fontStyle: 'normal', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre'}}>
            <p dir="ltr" style={{lineHeight: '1.38', backgroundColor: '#ffffff', marginTop: '10pt', marginBottom: '19pt'}}><span style={{fontSize: '11.5pt', fontFamily: 'Arial', color: '#000000', backgroundColor: 'transparent', fontWeight: 400, fontStyle: 'normal', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre-wrap'}}>Covered by the vendor.</span></p>
          </li>
        </ul>
        <p dir="ltr" style={{lineHeight: '1.38', backgroundColor: '#ffffff', marginTop: '10pt', marginBottom: '0pt', padding: '0pt 0pt 19pt 0pt'}}><span style={{fontSize: '12.499999999999998pt', fontFamily: 'Arial', color: '#000000', backgroundColor: 'transparent', fontWeight: 700, fontStyle: 'normal', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre-wrap'}}>Terms and conditions</span></p>
        <p dir="ltr" style={{lineHeight: '1.38', backgroundColor: '#ffffff', marginTop: '0pt', marginBottom: '0pt', padding: '-9pt 0pt 19pt 0pt'}}><span style={{fontSize: '12.499999999999998pt', fontFamily: 'Arial', color: '#000000', backgroundColor: 'transparent', fontWeight: 400, fontStyle: 'normal', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre-wrap'}}>The customer must submit the video of the unwrapping the products to claim the Returns, Refunds and Exchanges Policy on the Damaged products if any.</span></p>
        <p dir="ltr" style={{lineHeight: '1.38', backgroundColor: '#ffffff', marginTop: '0pt', marginBottom: '0pt', padding: '-9pt 0pt 19pt 0pt'}}><span style={{fontSize: '12.499999999999998pt', fontFamily: 'Arial', color: '#000000', backgroundColor: 'transparent', fontWeight: 700, fontStyle: 'normal', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre-wrap'}}>Faulty &amp; Misleading product advertisement review</span></p>
        <p dir="ltr" style={{lineHeight: '1.38', backgroundColor: '#ffffff', marginTop: '0pt', marginBottom: '0pt', padding: '-9pt 0pt 19pt 0pt'}}><span style={{fontSize: '11.5pt', fontFamily: 'Arial', color: '#000000', backgroundColor: 'transparent', fontWeight: 400, fontStyle: 'normal', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre-wrap'}}>A review on the claim is conducted by the vendor and Arivanna; With Arivanna being the final decision maker on the outcome.</span></p>
        <p dir="ltr" style={{lineHeight: '1.38', backgroundColor: '#ffffff', marginTop: '0pt', marginBottom: '19pt', padding: '-9pt 0pt 0pt 0pt'}}><span style={{fontSize: '12.499999999999998pt', fontFamily: 'Arial', color: '#000000', backgroundColor: 'transparent', fontWeight: 700, fontStyle: 'normal', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre-wrap'}}>How to return</span></p>
        <ol style={{marginTop: 0, marginBottom: 0, paddingInlineStart: '48px'}}>
          <li aria-level={1} dir="ltr" style={{listStyleType: 'decimal', fontSize: '11.5pt', fontFamily: 'Arial', color: '#000000', backgroundColor: 'transparent', fontWeight: 400, fontStyle: 'normal', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre'}}>
            <p dir="ltr" style={{lineHeight: '1.38', backgroundColor: '#ffffff', marginTop: '10pt', marginBottom: '0pt'}}><span style={{fontSize: '11.5pt', fontFamily: 'Arial', color: '#000000', backgroundColor: 'transparent', fontWeight: 400, fontStyle: 'normal', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre-wrap'}}>Navigate to your orders page.</span></p>
          </li>
          <li aria-level={1} dir="ltr" style={{listStyleType: 'decimal', fontSize: '11.5pt', fontFamily: 'Arial', color: '#000000', backgroundColor: 'transparent', fontWeight: 400, fontStyle: 'normal', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre'}}>
            <p dir="ltr" style={{lineHeight: '1.38', backgroundColor: '#ffffff', marginTop: '0pt', marginBottom: '0pt'}}><span style={{fontSize: '11.5pt', fontFamily: 'Arial', color: '#000000', backgroundColor: 'transparent', fontWeight: 400, fontStyle: 'normal', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre-wrap'}}>Open the order that contains items you wish to return.</span></p>
          </li>
          <li aria-level={1} dir="ltr" style={{listStyleType: 'decimal', fontSize: '11.5pt', fontFamily: 'Arial', color: '#000000', backgroundColor: 'transparent', fontWeight: 400, fontStyle: 'normal', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre'}}>
            <p dir="ltr" style={{lineHeight: '1.38', backgroundColor: '#ffffff', marginTop: '0pt', marginBottom: '0pt'}}><span style={{fontSize: '11.5pt', fontFamily: 'Arial', color: '#000000', backgroundColor: 'transparent', fontWeight: 400, fontStyle: 'normal', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre-wrap'}}>Select the individual items you wish to return and click return.</span></p>
          </li>
          <li aria-level={1} dir="ltr" style={{listStyleType: 'decimal', fontSize: '11.5pt', fontFamily: 'Arial', color: '#000000', backgroundColor: 'transparent', fontWeight: 400, fontStyle: 'normal', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre'}}>
            <p dir="ltr" style={{lineHeight: '1.38', backgroundColor: '#ffffff', marginTop: '0pt', marginBottom: '0pt'}}><span style={{fontSize: '11.5pt', fontFamily: 'Arial', color: '#000000', backgroundColor: 'transparent', fontWeight: 400, fontStyle: 'normal', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre-wrap'}}>Follow the prompts (Return form) including uploading relevant images.</span></p>
          </li>
          <li aria-level={1} dir="ltr" style={{listStyleType: 'decimal', fontSize: '11.5pt', fontFamily: 'Arial', color: '#000000', backgroundColor: 'transparent', fontWeight: 400, fontStyle: 'normal', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre'}}>
            <p dir="ltr" style={{lineHeight: '1.38', backgroundColor: '#ffffff', marginTop: '0pt', marginBottom: '0pt', padding: '0pt 0pt 19pt 0pt'}}><span style={{fontSize: '11.5pt', fontFamily: 'Arial', color: '#000000', backgroundColor: 'transparent', fontWeight: 400, fontStyle: 'normal', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre-wrap'}}>Navigate to your returns page to observe the return status as it is processed.</span></p>
          </li>
          <li aria-level={1} dir="ltr" style={{listStyleType: 'decimal', fontSize: '11.5pt', fontFamily: 'Arial', color: '#000000', backgroundColor: 'transparent', fontWeight: 400, fontStyle: 'normal', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre'}}>
            <p dir="ltr" style={{lineHeight: '1.38', backgroundColor: '#ffffff', marginTop: '0pt', marginBottom: '19pt', padding: '-9pt 0pt 0pt 0pt'}}><span style={{fontSize: '11.5pt', fontFamily: 'Arial', color: '#000000', backgroundColor: 'transparent', fontWeight: 400, fontStyle: 'normal', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre-wrap'}}>Wait up to 30 days for the return process to be resolved.&nbsp;</span></p>
          </li>
        </ol>
        <p><br /></p>
                    </div>
                </div>
                <div>
        
      </div>
            </div>
        </ContainerPage>
    )
};

export default TermsContect;
