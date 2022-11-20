import React, { useMemo } from "react";
import { Modal, ScrollView, Text,Box,View, VStack, HStack } from "native-base";
import { pxToDp } from "../../utils/stylesKits";
import {I18n} from '../../language/I18n'

const TextModal = props => {
  const { isOpen, onClose, type,showType } = props;

  const TextContent = useMemo(() => {
    if (type == 0) {
      return (
        <VStack >
          <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}>One of the core values of AIDA is security and efficiency – so we totally protect your data and we worship the ownership of our client's assets including their personal data. </Text>
          <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}>With this privacy policy, we intend to be fully transparent about what kind of data is processed while using our website aidameta.io . We want to create easy mechanisms with which to inform about our processes that involve your data, to better understand how to exercise your privacy rights, and where it is possible to manage your privacy choices.</Text>

          <Text fontSize={pxToDp(42)} fontWeight='800' color='#181818' mt={pxToDp(22)}>Our commitment</Text>
          <HStack pl={pxToDp(22)}>
            <Box w={pxToDp(16)} h={pxToDp(16)} background='#6E5FFF' borderRadius={pxToDp(8)} position='relative' top={pxToDp(43)} mr={pxToDp(32)}></Box>
            <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}>Even though we want to guarantee access to a new world of opportunities and this may imply some risks due to the fact that we use blockchain as the main technology so you can get full freedom of finance with no middleman or third parties, to ensure the performance of the operations.</Text>
          </HStack> 
          <HStack pl={pxToDp(22)}>
            <Box w={pxToDp(16)} h={pxToDp(16)} background='#6E5FFF' borderRadius={pxToDp(8)} position='relative' top={pxToDp(43)} mr={pxToDp(32)}></Box>
            <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}>AIDA does not and will not sell personal information. We only use the information that you provide and the public information received from the social media platform when you sign in with your social media account.</Text>
          </HStack> 
          <HStack pl={pxToDp(22)}>
            <Box w={pxToDp(16)} h={pxToDp(16)} background='#6E5FFF' borderRadius={pxToDp(8)} position='relative' top={pxToDp(43)} mr={pxToDp(32)}></Box>
            <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}>We have analyzed, classified, and defined our processes and the necessary security level for each process. Thus, we will use personal information for defined purposes.</Text>
          </HStack> 
          <HStack pl={pxToDp(22)}>
            <Box w={pxToDp(16)} h={pxToDp(16)} background='#6E5FFF' borderRadius={pxToDp(8)} position='relative' top={pxToDp(43)} mr={pxToDp(32)}></Box>
            <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}> We want our platform to be available and used worldwide. Therefore, we take this into account and want to comply with every applicable privacy and security law.</Text>
          </HStack> 
          <HStack pl={pxToDp(22)}>
            <Box w={pxToDp(16)} h={pxToDp(16)} background='#6E5FFF' borderRadius={pxToDp(8)} position='relative' top={pxToDp(43)} mr={pxToDp(32)}></Box>
            <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}>Security is one of the most important values of our platform, so we invest in cybersecurity in order to protect information and prevent attacks on our platform and assess the risks and vulnerabilities that may occur.</Text>
          </HStack> 
          <HStack pl={pxToDp(22)}>
            <Box w={pxToDp(16)} h={pxToDp(16)} background='#6E5FFF' borderRadius={pxToDp(8)} position='relative' top={pxToDp(43)} mr={pxToDp(32)}></Box>
            <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}>When our process is based on your consent, we will take all necessary measures to handle the legal mechanism to exercise it according to your will.</Text>
          </HStack> 

          <Text fontSize={pxToDp(42)} fontWeight='800' color='#181818' mt={pxToDp(22)}>Your personal data</Text>
          <Text fontSize={pxToDp(42)} fontWeight='800' color='#181818' mt={pxToDp(22)}>Information you give us</Text>
          <Text fontSize={pxToDp(42)} fontWeight='800' color='#181818' mt={pxToDp(22)}>E-mail address</Text>
          <Text fontSize={pxToDp(42)} fontWeight='800' color='#181818' mt={pxToDp(22)}>Social media accounts</Text>
          <Text fontSize={pxToDp(42)} fontWeight='800' color='#181818' mt={pxToDp(22)}>Phone number</Text>
          <Text fontSize={pxToDp(42)} fontWeight='800' color='#181818' mt={pxToDp(22)}>The details of the device you use</Text>
          <Text fontSize={pxToDp(42)} fontWeight='800' color='#181818' mt={pxToDp(22)}>Records of our discussion</Text>
          <Text fontSize={pxToDp(42)} fontWeight='800' color='#181818' mt={pxToDp(22)}>Information from your device</Text>

          <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}>Technical information, including the internet protocol (IP) address used to connect your computer to the internet, your log-in information, the browser type and version, the time-zone setting, the operating system and platform, the type of device you use, a unique device identifier (for example, your device's IMEI number, the MAC address of the device's wireless network interface, or the mobile phone number used by the device), mobile network information, your mobile operating system and the type of mobile browser you use；</Text>

          <Text fontSize={pxToDp(42)} fontWeight='800' color='#181818' mt={pxToDp(22)}>The right to restrict the use of personal data</Text>
          <Text fontSize={pxToDp(42)} fontWeight='800' color='#181818' mt={pxToDp(22)}>You can ask to temporarily limit the use of your data when you are considering:</Text>
          <HStack pl={pxToDp(22)}>
            <Box w={pxToDp(16)} h={pxToDp(16)} background='#6E5FFF' borderRadius={pxToDp(8)} position='relative' top={pxToDp(43)} mr={pxToDp(32)}></Box>
            <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}>a challenge you have made to the accuracy of your data, or</Text>
          </HStack> 
          <HStack pl={pxToDp(22)}>
            <Box w={pxToDp(16)} h={pxToDp(16)} background='#6E5FFF' borderRadius={pxToDp(8)} position='relative' top={pxToDp(43)} mr={pxToDp(32)}></Box>
            <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}> an objection you have made to the use of your data.</Text>
          </HStack> 
          <HStack pl={pxToDp(22)}>
            <Box w={pxToDp(16)} h={pxToDp(16)} background='#6E5FFF' borderRadius={pxToDp(8)} position='relative' top={pxToDp(43)} mr={pxToDp(32)}></Box>
            <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}>You may also ask to limit the use of your data rather than delete it if:</Text>
          </HStack> 
          <HStack pl={pxToDp(22)}>
            <Box w={pxToDp(16)} h={pxToDp(16)} background='#6E5FFF' borderRadius={pxToDp(8)} position='relative' top={pxToDp(43)} mr={pxToDp(32)}></Box>
            <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}> we processed your data unlawfully but you do not want it deleted, or</Text>
          </HStack> 
          <HStack pl={pxToDp(22)}>
            <Box w={pxToDp(16)} h={pxToDp(16)} background='#6E5FFF' borderRadius={pxToDp(8)} position='relative' top={pxToDp(43)} mr={pxToDp(32)}></Box>
            <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}> we no longer need your data but you want us to keep it in order to create, exercise or defend legal claims</Text>
          </HStack> 

          <Text fontSize={pxToDp(42)} fontWeight='800' color='#181818' mt={pxToDp(22)}>Automated decision-making in regard to personal data</Text>
          <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}>We may make automated decision-making about you. This means that we may use technology that can evaluate your personal circumstances and other factors to predict risks and attempts to fraud our system by creating multiple accounts in order to earn more points. We do this so that our services are efficient and to ensure that the decision is fair, consistent and based on the right information.</Text>
          <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}>When we make automated decision-making about you, you have the right to ask that it is manually reviewed by a person.</Text>
          <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}>Usually, we apply automated decision-making for identity and address checks, detecting fraud and keeping to contracts and agreements between you and us.</Text>
          <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}>If you would like additional information, please contact us via email at support@aidameta.io.</Text>


          <Text fontSize={pxToDp(42)} fontWeight='800' color='#181818' mt={pxToDp(22)}>The security of personal data</Text>
          <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}>As stated beforehand, we price security, integrity and availability of personal data. We use a variety of physical and technical measures to keep personal data safe and prevent data breaches. Electronic data and databases are stored on secure computer systems with control over access to information using both physical and electronic means. Our staff receives data protection and information security training. We have detailed security and data protection policies that the staff is required to follow when they handle your personal data.</Text>
          <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}>While we take all reasonable steps to ensure that your personal data will be kept secure, we cannot guarantee it will be secure during transmission by you to our website. We use HTTPS (HTTP Secure), where the communication protocol is encrypted through Transport Layer Security for secure communication over networks and sites.</Text>
          <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}>When you use our service, which includes our social network accounts, we advise you not to share any personal data that you don't want to be seen, collected or used because this information will become publicly available.</Text>

          <Text fontSize={pxToDp(42)} fontWeight='800' color='#181818' mt={pxToDp(22)}>Updates to the Policy</Text>
          <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}>If we change the way we use your data, we will update this Privacy Policy and, if appropriate, we will inform you through our website.</Text>
          
          <Text fontSize={pxToDp(42)} fontWeight='800' color='#181818' mt={pxToDp(22)}>Usage of the cookies on the website</Text>
          <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}>We use cookies to analyze how you use our website and improve the website’s functionalities. Please read our Cookies Policy for more information about the cookies we use.</Text>
          
        </VStack>
      );
    } else {
      return (
        <VStack >

          <Text fontSize={pxToDp(42)} fontWeight='800' color='#181818' mt={pxToDp(22)}>Who we are</Text>
          <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}>Our site is operated by AIDAMETA PTE. LTD, under company number 409051, has our registered office at PAYA LEBAR SQUARE, 60 PAYA LEBAR ROAD Singapore. </Text>
          <Text fontSize={pxToDp(42)} fontWeight='800' color='#181818' mt={pxToDp(22)}>Which regions do we serve</Text>
          <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}>The following countries are unavailable: Crimea、Myanmar,、Syria,、Cuba、 North Korea、Venezuela、Iran、South Sudan、Libya、 Sudan, and Mainland China.</Text>
          <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}>We are a metaverse gaming company with strict KYC for all users, prohibiting any use of our services for money laundering, criminal activities, etc.</Text>

          <Text fontSize={pxToDp(42)} fontWeight='800' color='#181818' mt={pxToDp(22)}>How do you register an account</Text>
          <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}>Users will sign in in a simple manner, by connecting one of their Mobile Number or their Email account to our Wallets.</Text>

           <Text fontSize={pxToDp(42)} fontWeight='800' color='#181818' mt={pxToDp(22)}>How do you conceal your account</Text>
          <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}>Users can close their account by sending an e-mail to the following address：support@aidameta.io. We will deactivate it and delete all the information in no more than 30 days since receiving the user's request, except for information we are legally bound to keep.</Text>
          <Text fontSize={pxToDp(42)} fontWeight='800' color='#181818' mt={pxToDp(22)}>How do we keep your account safe</Text>
          <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}>We use the Polygon Network. But we will easily and smoothly be routed to the Ethereum Network or BSC.</Text>
          <Text fontSize={pxToDp(42)} fontWeight='800' color='#181818'  mt={pxToDp(22)}>How do you keep your account safe</Text>
          <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}>In order to keep your account safe, please do the following:</Text> 
        
          <HStack pl={pxToDp(22)}>
            <Box w={pxToDp(16)} h={pxToDp(16)} background='#6E5FFF' borderRadius={pxToDp(8)} position='relative' top={pxToDp(43)} mr={pxToDp(32)}></Box>
            <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}>don’t share your security details with anyone;</Text>
          </HStack> 
          <HStack pl={pxToDp(22)}>
            <Box w={pxToDp(16)} h={pxToDp(16)} background='#6E5FFF' borderRadius={pxToDp(8)} position='relative' top={pxToDp(43)} mr={pxToDp(32)}></Box>
            <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}>make sure you close your account when you're not using it;</Text>
          </HStack> 
          <HStack pl={pxToDp(22)}>
            <Box w={pxToDp(16)} h={pxToDp(16)} background='#6E5FFF' borderRadius={pxToDp(8)} position='relative' top={pxToDp(43)} mr={pxToDp(32)}></Box>
          <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}>construct transactions and type EtherChain addresses correctly;</Text>
          </HStack>
          <HStack pl={pxToDp(22)}>
            <Box w={pxToDp(16)} h={pxToDp(16)} background='#6E5FFF' borderRadius={pxToDp(8)} position='relative' top={pxToDp(43)} mr={pxToDp(32)}></Box>
            <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}>keep your computer, mobile phone， email account and social media accounts secure. Don't let other people use them.</Text>
          </HStack> 

          <HStack pl={pxToDp(22)}tack>
            <Box w={pxToDp(16)} h={pxToDp(16)} background='#6E5FFF' borderRadius={pxToDp(8)} position='relative' top={pxToDp(43)} mr={pxToDp(32)}></Box>
            <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}>Your information must remain undisclosed to any third party. Contact us, as soon as possible, if you have any suspicion that your security details could be used without your permission.</Text>
          </HStack>

          <Text fontSize={pxToDp(42)} fontWeight='800' color='#181818' mt={pxToDp(22)}>What happens if something goes wrong</Text>
          <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}>You may contact us at any time by sending an e-mail to the following address: support@aidameta.io. Whether you know or suspect any suspicious activity regarding your account or you know that your information could or may have been disclosed, do not hesitate to use the provided address to contact us immediately. In order to take appropriate measures to help you secure your account once again, you must act swiftly.</Text>
          <Text fontSize={pxToDp(42)} fontWeight='800' color='#181818' mt={pxToDp(22)}>Legal issues</Text>

          <Text fontSize={pxToDp(42)} fontWeight='800' color='#181818' mt={pxToDp(22)}>Privacy Policy</Text>
          <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}>Here you may find our Privacy Policy, which applies by simply accessing our website.</Text>
          <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}>However, by entering into the agreement, you are giving us permission to gather, process and store your personal information for the purpose of providing our services to you. This doesn’t affect any rights and obligations you or we have under data protection law.</Text>
          <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}>You can withdraw your permission by closing your account, which will end the agreement between you and us. If you do this, we’ll stop using your information for the purpose of providing our services.</Text>

           <Text fontSize={pxToDp(42)} fontWeight='800' color='#181818' mt={pxToDp(22)}>Intellectual Property</Text>
          <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}>Our products (the content of our website, logo, design etc.) are protected by law and any infringement shall be treated as a breach of your contractual obligations, leading to a termination of our agreement. Any reverse engineering of our products (that is, reproducing them after a detailed examination of their construction or composition) shall be considered an infringement.</Text>
          <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}>Even more so, you may not use our company logo, website, design or information regarding the product for commercial purposes without the right to do so. Although you may link to our website’s home page, you are obliged to make sure that linking to our website is for a fair and completely legal action that does not affect our reputation nor does it bring any such damage. Any links to our website must contain a disclaimer that you are not affiliated with us, nor have our approval or any other partnership. We may at any time remove linking possibilities.</Text>

          <Text fontSize={pxToDp(42)} fontWeight='800' color='#181818' mt={pxToDp(22)}>Limited liability</Text>
          <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}>The information we provide on our website and our social networks consist of our official communication. These platforms as well as newsletters provide general information only.</Text>
          <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}>Although we make efforts to keep the information updated we are not responsible for information found on other media platforms or channels.</Text>
          <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}>Also, the platform may contain links to websites operated by third party. We provide these links to other websites for your convenience but accessing and/or using them is at your own risk. The sites are not under our control and we are not responsible for their content. These links do not imply endorsement by us of the information or materials on any other site and we disclaim any responsibility for your access to and use of these linked websites.</Text>
          <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}>Furthermore, we decline any responsibility in case you lose control of any of your accounts used for signing in to our website or linked in any way to it.</Text>
          <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}>The fortuitous event presupposes the existence of a situation that totally or partially prevents the performance of the contract, and may be determined by causes such as:</Text>
          <HStack pl={pxToDp(22)}>
            <Box w={pxToDp(16)} h={pxToDp(16)} background='#6E5FFF' borderRadius={pxToDp(8)} position='relative' top={pxToDp(43)} mr={pxToDp(32)}></Box>
            <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}> loss of the database for reasons beyond our control;</Text>
          </HStack> 

          <HStack pl={pxToDp(22)}>
            <Box w={pxToDp(16)} h={pxToDp(16)} background='#6E5FFF' borderRadius={pxToDp(8)} position='relative' top={pxToDp(43)} mr={pxToDp(32)}></Box>
            <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}> damage to the computer’s data storage system;</Text>
          </HStack> 

          <HStack pl={pxToDp(22)}>
            <Box w={pxToDp(16)} h={pxToDp(16)} background='#6E5FFF' borderRadius={pxToDp(8)} position='relative' top={pxToDp(43)} mr={pxToDp(32)}></Box>
            <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}> attempted fraud by electronic means or other means.</Text>
          </HStack> 
          <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}>The conditions of notification in case of a fortuitous event, as well as all legal effects, are those presented in the chapter on Force Majeure.</Text>

          <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}>We shall not be liable for any indirect or consequential losses including but not limited to loss of profit, savings, business and reputation. We shall not be liable for any losses arising from our compliance with legal and regulatory requirements.</Text>

          <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}>We shall not be liable for any indirect or consequential losses including but not limited to loss of profit, savings, business and reputation. We shall not be liable for any losses arising from our compliance with legal and regulatory requirements.</Text>

          <Text fontSize={pxToDp(42)} fontWeight='800' color='#181818' mt={pxToDp(22)}>Force Majeure</Text>
          <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}>An event of force majeure exempts the affected Party from the total or partial fulfillment of obligations under this agreement, provided that the Party affected by the event of force majeure respects the provisions of this chapter.</Text>
          <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}>For purposes of this Agreement, an event of force majeure shall mean any insurmountable event that cannot be controlled or predicted by the affected Party, including but not limited to fire, earthquake, flood or war and that prevents the affected Party to totally or partially fulfill its obligations under this agreement. Legislative changes cannot be considered force majeure events.</Text>
          <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}>The affected Party shall notify the other Party of the event of force majeure within three (3) days from the occurrence thereof and in no later than two (2) weeks will present a certificate from the Chamber of Commerce or other competent authority attesting to this event. The affected Party shall notify the other Party promptly and in any event within 24 hours of the termination of the force majeure event.</Text>

          <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}>An announcement made on our website shall be considered valid as a notification of the event of force majeure under this chapter. The affected Party will do its utmost to fulfill its other obligations not affected by the force majeure event. If the force majeure event lasts more than three (3) months, then the other Party is entitled to consider the contract terminated, without being able to claim damages.</Text>
          <Text fontSize={pxToDp(42)} fontWeight='800' color='#181818' mt={pxToDp(22)}>Applicable law to our contract with you</Text>
          <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}>These Terms and Conditions shall be governed by and interpreted in accordance with the laws of where our headquarters is located.</Text>
          <Text fontSize={pxToDp(42)} fontWeight='800' color='#181818' mt={pxToDp(22)}>Language versions</Text>
          <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}>These Terms and Conditions are drafted in English. By creating your account, you expressly declare that either you fully understand English, or you have received help to understand it.</Text>
          <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}>If these Terms and Conditions are translated into another language, the translation is for reference only and the English version will apply.</Text>
          <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}>We will communicate with you in English and will always accept communications made to us in English. You can choose your preferred language from the list of supported languages in your AIDA Account profile and we will send you automated email notifications and communications regarding changes to these Terms and Conditions in your chosen language. For non-standard communication, we reserve the right to communicate with you in English. Documents or communications in any other languages are for convenience only and shall not constitute an obligation on us to conduct any further communication in that language.</Text>
          <Text fontSize={pxToDp(42)} fontWeight='800' color='#181818' mt={pxToDp(22)}>Notifications</Text>
          <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}>Our notifications to you shall be sent through your account, in case of private notifications, or by simply announcing this on our website, in case of public notifications.</Text>
          <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}>Your notifications to us shall be sent to this e-mail: support@aidameta.io</Text>
          <Text fontSize={pxToDp(42)} fontWeight='800' color='#181818' mt={pxToDp(22)}>Termination</Text>
          <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}>This agreement shall terminate in the following situations:</Text>
          <HStack pl={pxToDp(22)}>
            <Box w={pxToDp(16)} h={pxToDp(16)} background='#6E5FFF' borderRadius={pxToDp(8)} position='relative' top={pxToDp(43)} mr={pxToDp(32)}></Box>
            <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}> if provided by law;</Text>
          </HStack> 
          <HStack pl={pxToDp(22)}>
            <Box w={pxToDp(16)} h={pxToDp(16)} background='#6E5FFF' borderRadius={pxToDp(8)} position='relative' top={pxToDp(43)} mr={pxToDp(32)}></Box>
            <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}> by failing to respect your obligations under this agreement or when this sanction is expressly mentioned in these Terms and Conditions. Termination will operate by sending you a notification and will operate de jure, without Court intervention, without any other formalities and without the possibility of granting a grace term. The notification shall state the violated contractual obligation and shall immediately enter into force.</Text>
          </HStack> 
          <Text fontSize={pxToDp(42)} fontWeight='800' color='#181818' mt={pxToDp(22)}>Amending the Terms & Conditions</Text>
          <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}>These Terms and Conditions govern the opening, use and closure of your AIDA Account and other related payment services as referred to herein. Together with any other terms and conditions referred to in these Terms and Conditions, they constitute the agreement between you and us. For the use of additional services, you may have to accept additional terms and conditions as notified to you when you are ordering or using such services. You are advised to print or download and keep a copy of these Terms of Use for future reference. You can always view the current Terms of Use on our Website.</Text>
          <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}>If we add a new product or service that doesn't change the Terms and Conditions of your account, we may add the product or service immediately and let you know before you use it.</Text>
          <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}>We'll only change these Terms and Conditions for the following reasons:</Text>
          <HStack pl={pxToDp(22)}>
            <Box w={pxToDp(16)} h={pxToDp(16)} background='#6E5FFF' borderRadius={pxToDp(8)} position='relative' top={pxToDp(43)} mr={pxToDp(32)}></Box>
            <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}>if we think it will make them easier to understand or more helpful to you;</Text>
          </HStack> 
          <HStack pl={pxToDp(22)}>
            <Box w={pxToDp(16)} h={pxToDp(16)} background='#6E5FFF' borderRadius={pxToDp(8)} position='relative' top={pxToDp(43)} mr={pxToDp(32)}></Box>
            <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}>to reflect the way our business is run;</Text>
          </HStack> 
          <HStack pl={pxToDp(22)}>
            <Box w={pxToDp(16)} h={pxToDp(16)} background='#6E5FFF' borderRadius={pxToDp(8)} position='relative' top={pxToDp(43)} mr={pxToDp(32)}></Box>
            <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}>to reflect legal or regulatory requirements that apply to us;</Text>
          </HStack> 
          <HStack pl={pxToDp(22)}>
            <Box w={pxToDp(16)} h={pxToDp(16)} background='#6E5FFF' borderRadius={pxToDp(8)} position='relative' top={pxToDp(43)} mr={pxToDp(32)}></Box>
            <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}>to reflect changes in the cost of running our business; or </Text>
          </HStack> 
          <HStack pl={pxToDp(22)}>
            <Box w={pxToDp(16)} h={pxToDp(16)} background='#6E5FFF' borderRadius={pxToDp(8)} position='relative' top={pxToDp(43)} mr={pxToDp(32)}></Box>
            <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}>or because we are changing or introducing new services or products that affect our existing services or products covered by these terms and conditions.</Text>
          </HStack> 
          <Text fontSize={pxToDp(42)} fontWeight='800' color='#181818' mt={pxToDp(22)}>Miscellaneous</Text>
          <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818' mt={pxToDp(19)}>If any provision of this agreement becomes illegal, invalid or unenforceable under any enactment, clause or part of that clause will be considered as not being part of this agreement while the legality, validity or enforceability of the remaining clauses of this agreement will not be affected, and the Parties will negotiate in good faith to replace the illegal, invalid and/or unenforceable clause with another clause to keep as much as possible the meaning of this agreement.</Text>
          <Text fontSize={pxToDp(36)} fontWeight='400' color='#181818'>You expressly declare that they acknowledged all clauses (especially Chapters), that you have read them, understood them and expressly accepted them and that these clauses have been subject to direct negotiation.</Text> 

        </VStack>
      );
    }
  }, [type]);
  return (
    <>
    {showType == "view" ? 
      <View p={pxToDp(43)}>
        {/* <Text fontSize={pxToDp(43)}>
          {type == 0 ? "Terms and Conditions" : " Privacy Policy"}
        </Text> */}
        {TextContent}
      </View>
      :
    <Modal isOpen={isOpen} onClose={() => onClose(false)}>
      <Modal.Content pl={pxToDp(22)} pr={pxToDp(22)}>
        <Modal.Header>{type == 0 ? I18n.t("register.service") : I18n.t("register.privacyPolice")}</Modal.Header>
        <ScrollView>{TextContent}</ScrollView>
      </Modal.Content>
    </Modal>
    }
    </>
  );
};

export default React.memo(TextModal);
