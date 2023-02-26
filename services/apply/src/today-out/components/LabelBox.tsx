import styled from '@emotion/styled';
import { PropsWithChildren } from 'react';
import { FlexCol, FlexRow } from '../../common/Flexbox';

interface LabelBoxProps {
    label: string;
}

const LabelBox = ({ label, children }: PropsWithChildren<LabelBoxProps>) => {
    return (
        <FlexCol gap={8} fullWidth>
            <LabelText>
                {label}
                <p>*</p>
            </LabelText>
            {children}
        </FlexCol>
    );
};

const LabelText = styled(FlexRow)`
    color: ${({ theme }) => theme.colors.gray900};
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    > p {
        color: ${({ theme }) => theme.colors.red500};
    }
`;

export default LabelBox;
