import React, { useEffect, useState } from 'react';
import UserInformationRepository from '~/repositories/UserInformationRepository';
import { storage } from '~/firebase/index';
import { Spin } from 'antd';

const ProfileImage = (props) => {
    const [url, setUrl] = useState('/static/img/users/1.png');
    const [id_user_profile_image, set_id_user_profile_image] = useState(0);
    const [loading, setLoading] = useState(false);

    async function getUserInformation(id_user) {
        setLoading(true);
        const responseData = await UserInformationRepository.getUserById(
            id_user
        );

        if (responseData.url) {
            setUrl(responseData.url);
            set_id_user_profile_image(responseData.id_user_profile_image);
        }
        setLoading(false);
    }

    useEffect(() => {
        getUserInformation(props.auth.id_user);
    }, [props.auth.id_user]);

    const previewFile = (e) => {
        const image = e.target.files[0];

        const imageSelected = document.querySelector('img');
        const fileInput = document.querySelector('input[type=file]').files[0];

        const reader = new FileReader();

        reader.addEventListener(
            'load',
            function () {
                // convert image file to base64 string

                setUrl(reader.result);

                imageSelected.src = url;
            },
            false
        );

        if (fileInput) {
            reader.readAsDataURL(fileInput);
        }
        handleFirebaseStorage(image);
    };

    const handleFirebaseStorage = (image) => {
        setLoading(true);

        const uploadTask = storage
            .ref(
                `images/user_profile_images/${props.auth.id_user}/${image.name}`
            )
            .put(image);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                // const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                // setProgress(progress);
            },
            (error) => {
                setLoading(false);
            },
            () => {
                storage
                    .ref('images')
                    .child('user_profile_images')
                    .child(`${props.auth.id_user}`)
                    .child(`${image.name}`)
                    .getDownloadURL()
                    .then((url) => {
                        updateUrl(url);
                    });
            }
        );
    };

    const updateUrl = async (url) => {
        const data = {
            url_info: {
                url,
                id_user_profile_image,
                alt: 'profile image',
                updated_at: new Date(),
            },
        };

        const res = await UserInformationRepository.updateUser(data);
        if (res) {
            setUrl(url);
        }
        setLoading(false);
    };

    if (!loading) {
        return (
            <label style={{ cursor: 'pointer' }}>
                <input
                    id="imageFile"
                    type="file"
                    onChange={previewFile}
                    style={{ display: 'none' }}
                    accept="image/*"
                />
                <img
                    id="imgFileUpload"
                    src={url}
                    alt="profile image"
                    style={{ maxHeight: '50px' }}
                />
            </label>
        );
    } else {
        return <Spin />;
    }
};

export default ProfileImage;
