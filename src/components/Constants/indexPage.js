import React from "react"
import Merchant from "../../../assets/merchant.svg"
import Merchant2 from "../../../assets/merchant2.svg"
import Airtime from "../../../assets/Airtime.svg"
import NFC from "../../../assets/NFC.svg"
import Lunch from "../../../assets/lunch.svg"
import Fund from "../../../assets/fund.svg"
import Start from "../../../assets/start.svg"
import Download from "../../../assets/download.svg"
import Create from "../../../assets/create.svg"
import StartList from "../../../assets/startlist.svg"
import FundList from "../../../assets/fundList.svg"
import FAQ from "../../../assets/faqs.svg"
import Support from "../../../assets/support.svg"
import Card from "../../../assets/Card.svg"
import Xamp from "../../images/Xamp.png"
import Net from "../../images/Netapp.png"
import Mtn from "../../images/mtn.png"
import Glo from "../../images//glo.png"
import Olawale from "../../images/olawale.png"
import Richard from "../../images/richard.png"
import Omoni from "../../images/omoni.png"
// import first
export const FirstCardSectionText =
  "RETOPA is	one	that is	created	to	address	the	fast	and	insatiable	hunger	for airtime	and	data seamless	experience, with RETOPA a user	can	simply	purchase	airtime / data in less than	10	seconds with just	a	tap	to	simplify the	day - to - day need."
export const SecondCardSectionText =
  "The Process Flow from Operators or Major Dealers to Retailer is quite easy "

export const FirstCardInfo = [
  {
    svg: <Merchant />,
    title: "Merchants(Operators or Dealers)",
    text:
      "A merchant on RETOPA  can be a wholesaler or a retailer who sells airtime, data and helps with the payment of utility bills as requested by the customer. ",
    Link: "Merchants",
  },
  {
    svg: <Airtime />,
    title: "Airtime, Data & Bills Payment",
    text:
      "RETOPA Technology has the capacity to generate Voucher (PINs) for data and airtime,it also allows for other bill payment",
    Link: "Airtime",
  },
  {
    svg: <NFC />,
    title: "NFC (Near field communication)",
    text:
      "RETOPA devices are NFC enabled, which allows seamless and easy transactions between our devices",
    Link: "NFC",
  },
]
export const SecondCardInfo = [
  {
    svg: <Lunch />,
    title: "Locate a dealer",
    text:
      "Retailers can simply walk to the dealer nearby , and pay cash into his RETOPA Wallet.",
  },
  {
    svg: <Fund />,
    title: "Fund Your Account",
    text:
      "The dealer logs into the RETOPA dashboard and credits the retailer’s wallet with the paid amount.",
  },
  {
    svg: <Start />,
    title: "Start Your Transactions",
    text:
      "The Retailer receives credit alert of the paid amount on his/her RETOPA device, and starts transactions",
  },
]

export const IndexList = [
  { svg: <Download />, text: "Download the app" },
  { svg: <Create />, text: "Create and account" },
  { svg: <FundList />, text: "Fund your account" },
  { svg: <StartList />, text: "Start transacting" },
  { svg: <FAQ />, text: "FAQ’s & live chat" },
  { svg: <Support />, text: "Get unlimited support" },
]

export const ThirdCardInfo = [
  {
    svg: <Merchant2 />,
    title: "Merchants(Operators or Dealers)",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore Lorem ipsum dolor sit amet",
  },
  {
    svg: <Card />,
    title: "Retailer POT	and NFC Mobile APP",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore Lorem ipsum dolor sit amet",
  },
  {
    svg: <Fund />,
    title: "Consumers/ Self Service",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore Lorem ipsum dolor sit amet",
  },
]

export const LogoOne = [Net, Xamp, Mtn, Glo]
export const Logo = [Net, Xamp, Mtn, Glo, Xamp, Mtn]

export const Carousel = [
  {
    image: Olawale,
    name: "Olawale Olayinka",
    Text:
      "Lorem ipsum dolor sit amet, consectetur adiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
    date: "Monday, 26/08/19  10:30am",
  },
  {
    image: Richard,
    name: "Richard Raymond",
    Text:
      "Lorem ipsum dolor sit amet, consectetur adiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
    date: "Monday, 26/08/19  10:30am",
  },
  {
    image: Omoni,
    name: "Rachel Omoni",
    Text:
      "Lorem ipsum dolor sit amet, consectetur adiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
    date: "Monday, 26/08/19  10:30am",
  },
  {
    image: Olawale,
    name: "Olawale Olayinka",
    Text:
      "Lorem ipsum dolor sit amet, consectetur adiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
    date: "Monday, 26/08/19  10:30am",
  },
  {
    image: Richard,
    name: "Richard Raymond",
    Text:
      "Lorem ipsum dolor sit amet, consectetur adiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
    date: "Monday, 26/08/19  10:30am",
  },
  {
    image: Omoni,
    name: "Rachel Omoni",
    Text:
      "Lorem ipsum dolor sit amet, consectetur adiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
    date: "Monday, 26/08/19  10:30am",
  },
]

export const Howto = {
  main_title: "Simple, Easy and fast way to topup",
  main_text:
    "RETOPA is a chip tag-type contact-less solution based on our Proprietary Offline Technology (POT) and NFC (Near Field Communication) technology that enable users fast, simple and secured means to top-up airtime and data bundles offline, no long voucher PIN required, an easily accessible channel for both vendors and consumers to transact easily. ",
  sub_text: "Start Retoping in less than 10 seconds",
  titleOne: "Create an account",
  textOne: "Sign up for an account with your name, email and phone number",
  titleTwo: "Fund your wallet",
  textTwo: "Using your debit card, bank account, USSD setup your payment plan ",
  titleThree: "Start transacting",
  textThree:
    "Start enjoying RETOPA by Recharging your phone, Buying Airtime and paying bills in less than 10 seconds",
}
