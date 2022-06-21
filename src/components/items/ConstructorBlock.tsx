import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {currentUser} from "../../business/CurrentUser";
import {Requests} from "../../redux/Requests";

type constructorBlockProps = {
    removeBlock(key: string): void;
    pass: string;
    index: number;
};
type constructorBlockState = {
    contentValue: string;
    titleValue: string;
    file: File | null;
};

export const ConstructorBlock = forwardRef((props: constructorBlockProps, ref) => {
    const [getState, setState] = useState<constructorBlockState>({
        contentValue: '',
        titleValue: '    ',
        file: null,
    })


    useImperativeHandle(ref, () => ({
            getState,
            setState,
            onChunkSend
    }))

    const onFileAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setState({...getState, file: e.target.files![0]})
    }

    const onChunkSend = async (post_hash: string | null) => {
        const file = getState.file as File;
        const formData = new FormData();
        formData.append('userToken', currentUser.userData.userToken);
        formData.append('title', getState.titleValue)
        formData.append('content', getState.contentValue || ' ')
        if (getState.file !== null) {
            formData.append('image', file, file.name)
        }
        if (post_hash) {
            formData.append('post_hash', post_hash)
        }
        const response = await Requests.addPostPipe(formData);
        console.log(response);
        return response;
    }


    return (
        <div className="ui segment">
            {props.index === 0 && <div className="ui fluid icon input">
                <input value={getState.titleValue} onChange={(e) => setState({...getState, titleValue: e.target.value})} className="text_area_block" placeholder="Введіть ваш текст..." />
            </div>}
            <br/>
            <input onChange={onFileAdd} type="file" title="Оберіть фото" accept=".gif,.jpg,.jpeg,.png" />
            <br />
            <br />
            <div className="content">
                <div className="ui fluid icon input">
                    <textarea value={getState.contentValue} onChange={(e) => setState({...getState, contentValue: e.target.value})} className="text_area_block" placeholder="Введіть ваш текст..." />
                </div>
            </div>
            <br/>
            <button onClick={() => {props.removeBlock(props.pass)}} className="ui red button">
                Видалити блок
            </button>
        </div>
    );
});

