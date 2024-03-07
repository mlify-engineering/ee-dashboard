import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { DownSquareOutlined, UpSquareOutlined, CheckOutlined, SnippetsOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';

const CardToolbar = ({ code, expand, isExpand }) => {
  const [copied, setCopied] = useState(false);
  const [copyTooltipVisible, setCopyTooltipVisible] = useState(false);

  const handleCodeCopied = () => {
    setCopied(true);
  };

  const onCopyTooltipVisibleChange = (visible) => {
    if (visible) {
      setCopyTooltipVisible(visible);
      setCopied(false);
      return;
    }
    setCopyTooltipVisible(visible);
  };

  return (
    <div className="code-box-actions">
      <span className={`code-box-icon mr-3 ${copied && copyTooltipVisible ? 'text-success' : ''}`}>
        <Tooltip
          title={copied ? 'Copied' : 'Copy code'}
          visible={copyTooltipVisible}
          onVisibleChange={onCopyTooltipVisibleChange}>
          <CopyToClipboard text={code} onCopy={() => handleCodeCopied()}>
            {copied ? <CheckOutlined /> : <SnippetsOutlined />}
          </CopyToClipboard>
        </Tooltip>
      </span>
      <span className="code-box-icon" onClick={expand}>
        <Tooltip title={isExpand ? 'Hide code' : 'Show code'}>
          {isExpand ? <UpSquareOutlined /> : <DownSquareOutlined />}
        </Tooltip>
      </span>
    </div>
  );
};

export default CardToolbar;
