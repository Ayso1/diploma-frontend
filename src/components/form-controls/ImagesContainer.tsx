import React, { FC, useCallback, useMemo, useState } from 'react';
import { Grid, Typography, Box, IconButton } from '@mui/material';
import clx from 'classnames';
import Image from 'material-ui-image';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import { useDropzone } from 'react-dropzone';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { Theme } from '@material-ui/core/styles';
import imageCompression from 'browser-image-compression';
import config from '../../config';
import { ControllerRenderProps } from 'react-hook-form';

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

interface Props extends ControllerRenderProps<any, any> {
  hideTitle?: boolean;
  maxCount?: number;
  imageContainerSize?: any;
  name: string;
  alignGridItems?: 'flex-start' | 'flex-end';
}

const name = 'images';

export const ImagesContainer: FC<Props> = (props) => {
  const { hideTitle, maxCount = 10, name, onChange, value: formValue } = props;
  const classes = useStyles(props);
  let uploadFile;
  //const [uploadFile] = getPhotoLinks(value);
  //const [uploadFile] = useUploadFileMutation();
  const [value, setValue] = useState(formValue ?? []);
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState('');

  const saveFile = (acceptedFiles) => {
    setFile(acceptedFiles.target.files[0]);
    setFileName(acceptedFiles.target.files[0].name);
  };

  const onDrop = useCallback(
    async (acceptedFiles) => {
      try {
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

          const data = new FormData();
          data.append('file', compressedFile);

          const res = await axios.post(`${config.apiUrl}/upload`, data, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          //console.log(res);

          //todo: my post must return url and filename
          //const {url, filename } = res.data?
          //const { url, filename } = res.data?.uploadFile!;
          const url = res.data.link;
          const filename = res.data.filename;
          const image = { url, filename };
          values = [...values, image];
          setValue(values);
          onChange(values);
        }
      } catch (e) {
        console.log(e);
      }
    },
    [uploadFile, maxCount, value, setValue]
  );

  const onImageDelete = async (image: ImageData) => {
    try {
      let index = value.indexOf(image);
      let newvalue = [...value];
      newvalue.splice(index, 1);
      const res = await axios.delete(
        `${config.apiUrl}/upload/${image.filename}`
      );
      setValue(newvalue);
      console.log(value);
    } catch (e) {
      console.log(e);
    }
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
                <Image src={image.url} className={classes.image} />
              </Grid>
            );
          })}
          {!hideAdd && (
            <Grid item {...getRootProps()}>
              <Box>
                <input {...getInputProps()} onChange={saveFile} />

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
