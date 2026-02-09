import React from 'react';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useTranslation } from 'react-i18next';
import { ActionClickBehavior } from '../types';
import SidePanelIcon from './SidePanelIcon';

interface ActionClickSelectorProps {
    actionClickBehavior: ActionClickBehavior;
    onChange: (behavior: ActionClickBehavior) => void;
}

export default function ActionClickSelector({ actionClickBehavior, onChange }: ActionClickSelectorProps) {
    const { t } = useTranslation();

    return (
        <ToggleButtonGroup
            value={actionClickBehavior}
            exclusive
            onChange={(event, newBehavior) => {
                if (newBehavior !== null) {
                    onChange(newBehavior);
                }
            }}
            aria-label="action click behavior"
            size="small"
        >
            <ToggleButton value="popup" aria-label="popup" style={{ outline: 'none' }}>
                <ChatBubbleOutlineIcon sx={{ mr: 1 }} fontSize="small" />
                {/* 弹出窗口 */}
                {t('settings.sidepanel.action_popup')}
            </ToggleButton>
            <ToggleButton value="sidepanel" aria-label="sidepanel" style={{ outline: 'none' }}>
                <SidePanelIcon sx={{ mr: 1 }} fontSize="small" />
                {/* 侧边栏 */}
                {t('settings.sidepanel.action_sidepanel')}
            </ToggleButton>
        </ToggleButtonGroup>
    );
}
