import labretImg     from "../assets/images/clients/client6.jpeg";
import nostrilImg    from "../assets/images/clients/client2.jpeg";
import navelImg      from "../assets/images/clients/client5.jpeg";
import industrialImg from "../assets/images/clients/client3.jpeg";
import septumImg     from "../assets/images/clients/client4.jpeg";


export interface OfferItem {
  image: string;   
  headline: string; 
}

export const offersData: OfferItem[] = [
  { image: labretImg,     headline: "2×1 Conch" },
  { image: nostrilImg,    headline: "15% OFF Efectivo" },
  { image: navelImg,      headline: "2×1 Labret" },
  { image: industrialImg, headline: "30% OFF Septum" },
  { image: septumImg,     headline: "Nostril 15% OFF" },
];
