import Image from 'next/image';
import { EnvelopeSimple, Info, Phone } from 'phosphor-react';
import profile from 'public/images/image-profile-not-found.png';
import { FC } from 'react';

import Separator from '@/components/common/separator/separator';
import User from '@/models/user/user';

interface Props {
  advertiser: User | undefined;
  authenticated: boolean;
}

const AdvertiserCard: FC<Props> = ({ advertiser, authenticated }) => (
  <div className="w-full max-w-[470px] rounded-lg border-2 border-neutral-100 px-6">
    <div className="flex items-center gap-4">
      <Image src={profile} alt="Foto de perfil" width={64} height={64} className="rounded-full" />
      <div className="flex flex-col p-6">
        <h4 className="text-neutral-500">Anunciante</h4>
        <p className="text-lg font-bold text-neutral-800">{advertiser?.name()}</p>
      </div>
    </div>
    <Separator className="before:h-0.5 after:h-0.5" />
    {authenticated ? (
      <div className="flex flex-col gap-4 p-6">
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-tertiary-medium p-2 text-white">
            <EnvelopeSimple size={20} />
          </span>
          <p className="text-neutral-800">{advertiser?.email()}</p>
        </div>
        {advertiser?.phoneNumber() !== undefined ? (
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-tertiary-medium p-2 text-white">
              <Phone size={20} />
            </span>
            <p className="text-neutral-800">{advertiser.phoneNumber()}</p>
          </div>
        ) : (
          ''
        )}
      </div>
    ) : (
      <div className="flex gap-4 p-6">
        <Info size={50} color="#6e3ed8" />
        <p className="text-neutral-800">
          Para visualizar as informações de contato do anunciante é necessario entrar ou criar sua conta na Adottami
        </p>
      </div>
    )}
  </div>
);

export default AdvertiserCard;
