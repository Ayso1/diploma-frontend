import React, { FC, useCallback, useMemo, useState } from 'react';
import { Grid, Typography, Box, IconButton } from '@mui/material';
import clx from 'classnames';
import Image from 'material-ui-image';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import { useDropzone } from 'react-dropzone';
import { makeStyles } from '@mui/styles';
import getPhotoLinks from '../../http/charity/getPhotoLink';
import deletePhoto from '../../http/charity/deletePhoto';

import { Theme } from '@material-ui/core/styles';
import imageCompression from 'browser-image-compression';

const IMG_CONTAINER_DEFAULT_SIZE = '120px';

const useStyles = makeStyles<Theme, Props>((theme) => ({
  gridContainer: {
    justifyContent: (props) => props.alignGridItems ?? 'flex-start',
  },
  dropzone: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    border: '1px dashed rgba(0, 0, 0, 0.24)',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  dropzoneIcon: {
    color: 'rgba(0, 0, 0, 0.48)',
  },
  pdfContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  deleteIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 1,
    padding: 0,
    borderRadius: 0,
    '&:hover': {},
  },
  image: {
    position: 'absolute',
    borderRadius: '5px',
    objectFit: 'cover',
  },
}));

interface ImageData {
  url: string;
  filename: string;
}

interface Props {
  hideTitle?: boolean;
  maxCount?: number;
  imageContainerSize?: any;
  register: any;
  name: string;
  alignGridItems?: 'flex-start' | 'flex-end';
}

const name = 'images';

export const ImagesContainer: FC<Props> = (props) => {
  const { hideTitle, maxCount = 10, register, name } = props;
  const classes = useStyles(props);
  let uploadFile;
  //const [uploadFile] = getPhotoLinks(value);
  //const [uploadFile] = useUploadFileMutation();
  const [value, setValue] = useState([]);
  const onDrop = useCallback(
    async (acceptedFiles) => {
      try {
        console.log(acceptedFiles);
        const files = acceptedFiles.slice(0, maxCount);
        let values = [...value];

        for (const file of files) {
          if (!(file instanceof File)) {
            return;
          }
          setValue([...value, { filename: file.name, url: '' }]);

          const compressedFile = await imageCompression(file, {
            maxSizeMB: 10,
          });

          const response = await uploadFile({
            variables: {
              file: compressedFile,
              pathEntries: ['image'],
            },
          });

          const { url, filename } = response.data?.uploadFile!;
          const image = { url, filename };
          values = [...values, image];
          setValue(values);
        }
      } catch (e) {
        //showError(<Trans>Failed to upload image</Trans>);
      }
    },
    [uploadFile, maxCount, value, setValue]
  );

  const onImageDelete = (image: ImageData) => {
    let index = value.indexOf(image);
    let newvalue = [...value];
    console.log(getPhotoLinks(image.filename));
    //deletePhoto(image.filename);
    newvalue.splice(index, 1);
    setValue(newvalue);
    console.log(value);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/png': ['.png', '.jpeg', '.jpg'] },
  });

  const hideAdd = useMemo(() => {
    return false;
  }, [maxCount]);

  return (
    <>
      <Box display="flex">
        <Grid container spacing={2}>
          {(value || []).map((image, i: number) => {
            return (
              <Grid key={i} item>
                {
                  <IconButton onClick={() => onImageDelete(image)}>
                    <DeleteIcon />
                  </IconButton>
                }
              </Grid>
            );
          })}
          {!hideAdd && (
            <Grid item {...getRootProps()}>
              <Box>
                <input {...register(name)} {...getInputProps()} />
                <AddIcon fontSize="large" />
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>
    </>
  );
};
export default ImagesContainer;
