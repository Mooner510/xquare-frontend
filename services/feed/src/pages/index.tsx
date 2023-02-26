import type { GetServerSideProps, NextPage } from 'next';
import { FlexCol } from '../common/components/Flexbox';
import FeedPost from '../main/components/post';
import styled from '@emotion/styled';
import ButtonTabs from '../main/components/ButtonTabs';
import useTabMenu from '../main/hooks/useTabMenu';
import WriteButton from '../main/components/WriteButton';
import { useRouter } from 'next/router';
import { sendBridgeEvent } from '@shared/xbridge';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { prefetchCategoryList } from '../common/hooks/useCategoryList';
import useFeedList, { prefetchFeedList } from '../main/hooks/useFeedList';
const Home: NextPage = () => {
    const { onChangeTabValue, selectedTabValueKey, tabMenuKeys } = useTabMenu();
    const { data: feedList } = useFeedList(selectedTabValueKey.category_id);
    const router = useRouter();
    return (
        <>
            <ButtonTabs
                items={tabMenuKeys}
                setValue={onChangeTabValue}
                value={selectedTabValueKey.name}
            />
            <FeedContainer>
                {feedList?.feeds.map((feed) => (
                    <FeedPost {...feed} key={feed.feed_id} />
                ))}
            </FeedContainer>
            <WriteButton
                onClick={() =>
                    sendBridgeEvent('navigate', { url: '/write', title: '글쓰기' }, () =>
                        router.push('/write'),
                    )
                }
            />
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    const queryClient = new QueryClient();
    await Promise.all([prefetchFeedList(queryClient), prefetchCategoryList(queryClient)]);
    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
};

const FeedContainer = styled(FlexCol)`
    > * + * {
        border-top: 8px solid ${({ theme }) => theme.colors.gray100};
    }
`;

export default Home;
