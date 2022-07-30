import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';

import Page from '@/components/common/page/page';
import EmptyData from '@/components/pages/components/empty-data/empty-data';
import Footer from '@/components/pages/components/footer/footer';
import Header from '@/components/pages/components/header/header';
import PublicationCard from '@/components/pages/components/publication-card/publication-card';
import useAPI from '@/hooks/api/use-api/use-api';
import useSession from '@/hooks/session/use-session/use-session';
import Publication from '@/models/publication/publication';

import { PAGE_TITLE } from './constants';

const PublicationDashboardPage: FC = () => {
  const [myPublications, setMyPublications] = useState<Publication[]>([]);
  const api = useAPI();
  const { user, isLoading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    const getRecentPublications = async () => {
      const publications = await api.adottami.publications.get({
        authorId: user?.id(),
      });
      setMyPublications(publications);
    };

    getRecentPublications();
  }, [api.adottami.publications, router, user]);

  return (
    <Page title={PAGE_TITLE}>
      <Header />
      <section className="m-auto mt-6 mb-16 w-80 lg:w-[992px]">
        <h2 className="pb-9 text-xl font-bold">Meus anúncios</h2>
        <div className="pb-6">
          <p className="inline-flex w-fit cursor-pointer items-center gap-1 text-lg leading-4 text-secondary-medium  decoration-secondary-medium underline-offset-8 transition duration-300 ease-out hover:text-secondary-dark hover:underline">
            Publicados ({myPublications.length})
          </p>
        </div>
        {myPublications.length !== 0 ? (
          <div className="grid grid-cols-1 gap-4 rounded-xl border-2 border-neutral-100 bg-surface-primary p-4  lg:w-full lg:grid-cols-3 tablet:p-6">
            {myPublications.map((publication) => {
              return (
                <div key={publication.id()} className="w-[281px] pt-1 lg:w-full">
                  <PublicationCard isMenuVisible publication={publication} />
                </div>
              );
            })}
          </div>
        ) : (
          <EmptyData message="Você não possui anúncios publicados no momento" />
        )}
      </section>
      <Footer />
    </Page>
  );
};

export default PublicationDashboardPage;
