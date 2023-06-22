import { Context, createContext, useContext, useEffect, useState } from 'react';
import { fetchNui } from '../utils/fetchNui';

interface Styles {
  PrimaryColor?: string;
  SecondaryColor?: string;
  TextColor?: string;
}

interface Config {
  Styles?: Styles;
}

interface ConfigCtxValue {
  config: Config;
  setConfig: (config: Config) => void;
}

const DebugConfig: Config = {
  Styles: {
    PrimaryColor: '#232833',
    SecondaryColor: '#374151',
    TextColor: '#ffffff',
  },
};

const ConfigCtx = createContext<{
  config: Config;
  setConfig: (config: Config) => void;
} | null>(null);

const ApplyStyles = (styles: Styles) => {
  const root = document.querySelector(':root') as HTMLElement;
  if (styles.PrimaryColor) {
    root.style.setProperty('--primary-color', styles.PrimaryColor);
  }
  if (styles.SecondaryColor) {
    root.style.setProperty('--secondary-color', styles.SecondaryColor);
  }
  if (styles.TextColor) {
    root.style.setProperty('--text-color', styles.TextColor);
  }
};

const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [config, setConfig] = useState<Config>({ Styles: {} });

  // Fetch and apply config
  useEffect(() => {
    fetchNui<Config>('getConfig', null, DebugConfig).then((data) => {
      setConfig(data);
      if (data.Styles) ApplyStyles(data.Styles);
    });
  }, []);

  return (
    <ConfigCtx.Provider value={{ config, setConfig }}>
      {children}
    </ConfigCtx.Provider>
  );
};

export default ConfigProvider;

export const useConfig = () =>
  useContext<ConfigCtxValue>(ConfigCtx as Context<ConfigCtxValue>);
