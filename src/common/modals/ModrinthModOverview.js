/* eslint-disable */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import path from 'path';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faInfo } from '@fortawesome/free-solid-svg-icons';
import { Button, Select } from 'antd';
import Modal from '../components/Modal';
import { transparentize } from 'polished';

import {
  getModrinthMods,
  // getAddonFiles,
  getModrinthMod,
  getModrinthModVersionsList,
  getModrinthModVersion
} from '../api';
import CloseButton from '../components/CloseButton';
import { closeModal, openModal } from '../reducers/modals/actions';
import { installModrinthMod, updateInstanceConfig } from '../reducers/actions';
import { remove } from 'fs-extra';
import { _getInstancesPath, _getInstance } from '../utils/selectors';
import { FABRIC, FORGE, CURSEFORGE_URL } from '../utils/constants';
import { formatNumber, formatDate } from '../utils';
import {
  filterFabricFilesByVersion,
  filterForgeFilesByVersion,
  getPatchedInstanceType
} from '../../app/desktop/utils';
import pMap from 'p-map';

const ModrinthModOverview = ({ id, gameVersion, instanceName }) => {
  const dispatch = useDispatch();
  const [description, setDescription] = useState(null);
  const [addon, setAddon] = useState(null);
  const [githubLink, setGithubLink] = useState(null);
  const [author, setAuthor] = useState(null);
  const [files, setFiles] = useState([]);
  const [selectedItem, setSelectedItem] = useState(id);
  // const [installedData, setInstalledData] = useState({ id, fileName });
  const [modId, setModId] = useState(id);
  const [fileName, setFileName] = useState(null);
  const [modName, setModName] = useState(null);

  const [bg, setBg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingFiles, setLoadingFiles] = useState(true);
  const instancesPath = useSelector(_getInstancesPath);
  const instance = useSelector(state => _getInstance(state)(instanceName));

  const getAllModVersions = async versionIds => {
    let modVersions = [];

    await pMap(versionIds, async id => {
      const mod = await getModrinthModVersion(id);
      modVersions = modVersions.concat(mod);
    });

    return modVersions;
  };

  useEffect(() => {
    const init = async () => {
      setLoadingFiles(true);
      await Promise.all([
        getModrinthMod(id).then(mod => {
          setBg(mod?.icon_url);
          setModName(mod?.title);
          setGithubLink(mod?.source_url);

          getModrinthModVersion(mod.versions[0]).then(mod => {
            const urlMod = mod?.files[0].url;
            setFileName(path.basename(urlMod));
          });

          getAllModVersions(mod.versions).then(mods => {
            console.log('mods', mod, mods);
            setFiles(mods);
          });
          setDescription(mod?.body !== '' ? mod?.body : mod?.description);
          setLoadingFiles(false);

          // const versionIds = await getModrinthModVersionsList(id);

          // const mod = await getModrinthModVersion(versionIds[0]);

          // const urlMod = mod?.files[0].url;
        })
      ]);
    };

    init();
  }, []);

  const getPlaceholderText = () => {
    if (loadingFiles) {
      return 'Loading files';
    } else if (files.length === 0 && !loadingFiles) {
      return 'Mod not available';
    } else {
      return 'Select a version';
    }
  };

  const getReleaseType = id => {
    switch (id) {
      case 'release':
        return (
          <span
            css={`
              color: ${props => props.theme.palette.colors.green};
            `}
          >
            [Stable]
          </span>
        );
      case 'beta':
        return (
          <span
            css={`
              color: ${props => props.theme.palette.colors.yellow};
            `}
          >
            [Beta]
          </span>
        );
      case 'alpha':
      default:
        return (
          <span
            css={`
              color: ${props => props.theme.palette.colors.red};
            `}
          >
            [Alpha]
          </span>
        );
    }
  };

  const handleChange = value => {
    setSelectedItem(value);
  };

  return (
    <Modal
      css={`
        height: 85%;
        width: 85%;
        max-width: 1500px;
      `}
      header={false}
    >
      <>
        <StyledCloseButton>
          <CloseButton onClick={() => dispatch(closeModal())} />
        </StyledCloseButton>
        <Container>
          <Parallax bg={bg}>
            <ParallaxContent>
              <ParallaxInnerContent>
                {modName}

                <ParallaxContentInfos>
                  <div>
                    <label>Author: </label>
                    {addon?.authors[0].name}
                  </div>
                  {addon?.downloadCount && (
                    <div>
                      <label>Downloads: </label>
                      {formatNumber(addon?.downloadCount)}
                    </div>
                  )}
                  <div>
                    <label>Last Update: </label>{' '}
                    {formatDate(addon?.dateModified)}
                  </div>
                  <div>
                    <label>MC version: </label>
                    {addon?.gameVersionLatestFiles[0].gameVersion}
                  </div>
                </ParallaxContentInfos>
                <Button
                  href={githubLink}
                  css={`
                    position: absolute;
                    top: 20px;
                    left: 20px;
                    width: 30px;
                    height: 30px;
                    display: flex;
                    justify-content: center;
                  `}
                  type="primary"
                >
                  <FontAwesomeIcon icon={faExternalLinkAlt} />
                </Button>
              </ParallaxInnerContent>
            </ParallaxContent>
          </Parallax>
          <Content>{ReactHtmlParser(description)}</Content>
        </Container>
        <Footer>
          {/* {modId && files.length !== 0 && !files.find(v => v.id === modId) && (
            <div
              css={`
                color: ${props => props.theme.palette.colors.yellow};
                font-weight: 700;
              `}
            >
              The installed version of this mod has been removed from
              CurseForge, so you will only be able to get it as part of legacy
              modpacks.
            </div>
          )} */}
          <StyledSelect
            placeholder={getPlaceholderText()}
            loading={loadingFiles}
            disabled={loadingFiles}
            value={
              files.length !== 0 &&
              files.find(v => v.id === modId) &&
              selectedItem
            }
            onChange={handleChange}
            listItemHeight={50}
            listHeight={400}
          >
            {(files || []).map(file => (
              <Select.Option title={file.name} key={file.id} value={file.id}>
                <div
                  css={`
                    display: flex;
                    height: 50px;
                  `}
                >
                  <div
                    css={`
                      flex: 7;
                      display: flex;
                      align-items: center;
                    `}
                  >
                    {file.version_number}
                  </div>
                  <div
                    css={`
                      flex: 2;
                      display: flex;
                      align-items: center;
                      flex-direction: column;
                      margin: 0 40px;
                    `}
                  >
                    {/* <div>{file.game_versions}</div> */}
                    <div
                      css={` display:flex; justify:-content: space-between;`}
                    >
                      {file.game_versions.map((version, i) =>
                        file.game_versions.length === i + 1 ? (
                          <div key={version}>{version}</div>
                        ) : (
                          <div key={version}>{version}-</div>
                        )
                      )}
                    </div>
                    <div>{getReleaseType(file.version_type)}</div>
                  </div>
                  <div
                    css={`
                      flex: 3;
                      display: flex;
                      align-items: center;
                    `}
                  >
                    <div>
                      {new Date(file.date_published).toLocaleDateString(
                        undefined,
                        {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }
                      )}
                    </div>
                  </div>
                </div>
              </Select.Option>
            ))}
          </StyledSelect>
          <Button
            type="primary"
            disabled={!selectedItem || modId === selectedItem}
            loading={loading}
            onClick={async () => {
              setLoading(true);
              if (modId) {
                await dispatch(
                  updateInstanceConfig(instanceName, prev => ({
                    ...prev,
                    mods: prev.mods.filter(v => v.fileName !== fileName)
                  }))
                );

                await remove(
                  path.join(instancesPath, instanceName, 'mods', fileName)
                );
              }
              const mod = files.find(x => x.id === selectedItem);

              const downloadUrl = mod.files[0].url;

              console.log('downloadUrl', mod?.id, downloadUrl);

              const newFile = await dispatch(
                installModrinthMod(mod?.id, downloadUrl, instanceName, id)
              );

              // const fileName = path.basename(downloadUrl);

              // setInstalledData({ id: selectedItem, fileName: newFile });
              setModId(id);
              setFileName(newFile);
              setLoading(false);
            }}
          >
            {modId ? 'Switch Version' : 'Download'}
          </Button>
        </Footer>
      </>
    </Modal>
  );
};

export default React.memo(ModrinthModOverview);

const StyledSelect = styled(Select)`
  width: 650px;
  height: 50px;
  .ant-select-selection-placeholder {
    height: 50px !important;
    line-height: 50px !important;
  }
  .ant-select-selector {
    height: 50px !important;
    cursor: pointer !important;
  }
  .ant-select-selection-item {
    flex: 1;
    cursor: pointer;
    & > div {
      & > div:nth-child(2) {
        & > div:last-child {
          height: 10px;
          line-height: 5px;
        }
      }
    }
  }
`;

const StyledCloseButton = styled.div`
  position: absolute;
  top: 30px;
  right: 30px;
  z-index: 1;
`;

const Container = styled.div`
  perspective: 1px;
  transform-style: preserve-3d;
  height: calc(100% - 70px);
  width; 100%;
  overflow-x: hidden;
  overflow-y: scroll;
`;

const Parallax = styled.div`
  display: flex;
  flex: 1 0 auto;
  position: relative;
  height: 100%;
  width: 100%;
  transform: translateZ(-1px) scale(2);
  z-index: -1;
  background: url('${props => props.bg}');
  background-repeat: no-repeat;
  background-size: cover;
`;

const ParallaxInnerContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    width: 30px;
    height: 30px;
  }
`;

const ParallaxContent = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 60px;
  color: ${props => props.theme.palette.text.secondary};
  font-weight: 700;
  padding: 0 30px;
  text-align: center;
  background: rgba(0, 0, 0, 0.8);
`;

const ParallaxContentInfos = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: normal;
  font-size: 12px;
  position: absolute;
  bottom: 40px;
  div {
    margin: 0 5px;
    label {
      font-weight: bold;
    }
  }
`;

const Content = styled.div`
  min-height: 100%;
  height: auto;
  display: block;
  padding: 30px 30px 90px 30px;
  font-size: 18px;
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  p {
    text-align: center;
  }
  img {
    max-width: 100%;
    height: auto;
  }
  pre {
    background: ${props => transparentize(0.2, props.theme.palette.grey[900])};
  }
  z-index: 1;
  backdrop-filter: blur(20px);
  background: ${props => transparentize(0.4, props.theme.palette.grey[900])};
`;

const Footer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 0;
  left: 0;
  height: 70px;
  width: 100%;
  background: ${props => props.theme.palette.grey[700]};
  && > * {
    margin: 0 10px;
  }
`;
