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
  dragDrop: {
    height: 120,
    fontSize: 20,
    marginBottom: 15,
    width: '100%',
    borderStyle: 'dashed',
    borderColor: '#3f51b5',
    borderWidth: 'thick',
    backgroundColor: '#eeeeee',
    textAlign: 'center',
    display: 'grid',
    alignItems: 'center',
    padding: 10,
    cursor: 'pointer',
  },
});

const acceptStyle = {
    borderColor: '#8bc34a',
    display: 'grid',
}

const rejectStyle = {
    borderColor: '#ff5722',
    display: 'grid',
}

class UploadComponent extends React.Component {
  state = {
    files: [],
  };

  handleChange = (acceptedFiles) => {
    console.log(acceptedFiles);
    this.setState({ files: acceptedFiles });
  };

  render() {
    const { classes } = this.props;
    const style = (isDragAccept, isDragReject, acceptedFiles)  =>({
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {}),
        ...(acceptedFiles.length > 0 ? acceptStyle: {}),
        })
    
    const generateText = (isDragAccept, isDragReject, acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            return `Uploaded file: ${acceptedFiles[0].name}`;
        } else if (isDragAccept) {
            return 'Drop your .CSV file here';
        } else if (isDragReject) {
            return 'File format not accepted. Please upload a .CSV'
        } else {
            return 'Drag and drop your .CSV file here or click to browse';
        }
    };

    return (
      <Dropzone accept="text/csv" onDrop={(acceptedFiles) => this.handleChange(acceptedFiles)} multiple={false}>
        {({ getRootProps, getInputProps, acceptedFiles, isDragAccept, isDragReject }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <div style={style(isDragAccept, isDragReject, acceptedFiles)} className={classes.dragDrop}>
                {generateText(isDragAccept, isDragReject, acceptedFiles)}
              </div>
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
