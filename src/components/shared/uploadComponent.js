import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dropzone from 'react-dropzone';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  majorButton: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginBottom: 15,
    width: '100%',

  },
});
const activeStyle = {
    backgroundColor: '#303f9f',
};

const acceptStyle = {
    backgroundColor: '#8bc34a',
}

const rejectStyle = {
    backgroundColor: '#ff5722',
}

class UploadComponent extends React.Component {
  state = {
    files: [],
  };

  handleChange = (acceptedFiles) => {
    console.log(acceptedFiles);
  };

  render() {
    const { classes } = this.props;
    const style = (isDragActive, isDragAccept, isDragReject, acceptedFiles)  =>({
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {}),
        ...(acceptedFiles.length > 0 ? acceptStyle: {}),
        })
    
    const generateText = (isDragAccept, isDragReject, acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            return `Uploaded ${acceptedFiles[0].name}`;
        } else if (isDragAccept) {
            return 'Upload file';
        } else if (isDragReject) {
            return 'File format not accepted. Please upload a .CSV'
        } else {
            return 'Drag and drop your .CSV file here or click to browse';
        }
    };

    return (
      <Dropzone accept="text/csv" onDrop={(acceptedFiles) => this.handleChange(acceptedFiles)} multiple={false}>
        {({ getRootProps, getInputProps, acceptedFiles, isDragActive, isDragAccept, isDragReject }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <Button style={style(isDragActive, isDragAccept, isDragReject, acceptedFiles)} className={classes.majorButton} color="primary" variant="contained">
                {generateText(isDragAccept, isDragReject, acceptedFiles)}
              </Button>
            </div>
          </section>
        )}
      </Dropzone>
    );
  }
}

UploadComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UploadComponent);
