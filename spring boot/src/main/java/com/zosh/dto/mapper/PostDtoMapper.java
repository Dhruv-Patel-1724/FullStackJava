package com.zosh.dto.mapper;

import java.util.ArrayList;
import java.util.List;

import com.zosh.dto.CommentDto;
import com.zosh.dto.PostDto;
import com.zosh.dto.UserDto;
import com.zosh.model.Post;
import com.zosh.model.User;
import com.zosh.utils.PostUtils;

public class PostDtoMapper {
	
	public static PostDto toPostDto(Post post,User user) {
		
		UserDto userDto=UserDtoMapper.userDTO(post.getUser());
		List<User> likedUsers=new ArrayList<>(post.getLiked());
		List<UserDto> userDtos=UserDtoMapper.userDTOS(likedUsers);
		List<CommentDto> comments=CommentDtoMapper.toCommentDtos(post.getComments());
		//String fullVideoUrl = "http://localhost:5454/videos/" + post.getVideo();
		//String fullVideoUrl = (post.getVideo() != null) ? "http://localhost:5454/uploads/" + post.getVideo() : null;
		String fullVideoUrl = post.getVideo();  // Cloudinary URL sidhu use karo

		//String fullVideoUrl = (post.getVideo() != null) ? "http://localhost:5454/uploads/" + post.getVideo() : null;
		PostDto postDto=new PostDto();
		postDto.setCaption(post.getCaption());
		postDto.setCreatedAt(post.getCreatedAt());
		postDto.setId(post.getId());
		postDto.setImage(post.getImage());
		postDto.setVideo(fullVideoUrl); 
		postDto.setUser(userDto);
		postDto.setLiked(userDtos);
		postDto.setComments(comments);
		postDto.setLikedByRequser(PostUtils.isLikedByReqUser(post, user));
		postDto.setSavedByRequser(PostUtils.isSaved(post, user));
		
		return postDto;
		
	}
	
	public static List<PostDto> toPostDtos(List<Post> posts, User user){
		List<PostDto> postDtos=new ArrayList<>();
		
		for(Post post:posts) {
			PostDto postDto=toPostDto(post,user);
			postDtos.add(postDto);
		}
		return postDtos;
	}

}
